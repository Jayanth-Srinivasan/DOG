module dao_manager::DAOManager {
    use aptos_framework::fungible_asset::{Metadata, FungibleStore, FungibleAsset};
    use aptos_framework::object::{Self, ExtendRef, Object};
    use aptos_std::vector;
    use aptos_std::string::{self, String};
    use aptos_std::table::{Self, Table};
    use aptos_std::option;
    use aptos_framework::primary_fungible_store;
    use aptos_framework::timestamp;
    use aptos_std::string_utils;

    // Error Codes
    const ERROR_UNAUTHORIZED: u64 = 1;
    const ERROR_TASK_NOT_FOUND: u64 = 2;
    const ERROR_EVENT_NOT_FOUND: u64 = 3;
    const ERROR_PRODUCT_NOT_FOUND: u64 = 4;
    const ERROR_NO_ASSIGNED_USER: u64 = 5;
    const ERROR_BOUNTY_TRANSFER_FAILED: u64 = 6;
    const ERROR_ITEM_NOT_FOUND: u64 = 7;
    const ERROR_INVALID_ITEM_TYPE: u64 = 8;
    const ERROR_NFT_TRANSFER_FAILED: u64 = 9;
    const ERROR_INSUFFICIENT_FUNDS: u64 = 10;

    // Structs
    struct Task has store, drop {
        task_id: u64,
        title: String,
        description: String,
        bounty: u64,
        status: String, // Open, In Progress, Completed
        assigned_to: option::Option<address>,
        created_by: address
    }

    struct DAOEvent has store, drop {
        event_id: u64,
        title: String,
        description: String,
        date: u64,
        location: String,
        participants: vector<address>  // List of users who RSVP'd to the event
    }

    struct MarketplaceItem has store, drop {
        item_id: u64,
        title: String,
        description: String,
        price: u64,
        item_type: String, // "NFT" or "Merch"
        creator: address, // Creator/owner (Admin)
        nft_metadata: option::Option<Object<FungibleAsset>>, // Metadata for NFT, None for Merch
        is_active: bool, // Item visibility (Active/Inactive)
    }

    struct MarketplaceRegistry has key, store {
        items: vector<MarketplaceItem>
    }

    struct DAO has key, store {
        name: String,
        admin: address,
        tasks: vector<Task>,
        events: vector<DAOEvent>,
        marketplace: MarketplaceRegistry,
        community_channels: vector<CommunityChannel>
    }

    struct CommunityChannel has store {
        channel_id: u64,
        name: String,
        description: String,
        platform: String, // Discord, Telegram, etc.
        invite_link: String
    }

    struct DAORegistry has key {
        daos: Table<String, DAO>
    }

    struct UserProfileRegistry has key {
        registered_profiles: vector<UserProfile>
    }

    struct LastQueriedProfile has key {
        profile: option::Option<UserProfile>
    }

    struct UserProfile has key, store, drop, copy {
        full_name: string::String,
        user_address: address,
        profile_description: string::String,
        image_link: string::String,
        account_handle: string::String,
        user_capabilities: vector<string::String>,
        dao_contributions: vector<string::String>,
        dao_administrations: vector<string::String>,
    }

    struct UserStake has key, store, drop {
        stake_store: Object<FungibleStore>,
        amount: u64,
    }

    struct FungibleAssetMetadata has key, store {
        fa_metadata_object: Object<Metadata>
    }

    struct FungibleStoreController has key {
        extend_ref: ExtendRef,
    }

    struct UserStakeController has key {
        extend_ref: ExtendRef,
    }

    // Initialize DAO and Marketplace Registry
    public entry fun initialize_dao_registry(admin: &signer) {
        let registry = DAORegistry {
            daos: table::new(),
        };
        move_to(admin, registry);
    }

    // Create DAO
    public entry fun create_dao(
        admin: &signer, 
        dao_name: String
    ) acquires DAORegistry {
        let admin_address = signer::address_of(admin);
        let registry = borrow_global_mut<DAORegistry>(@dao_manager);

        let dao = DAO {
            name: dao_name,
            admin: admin_address,
            tasks: vector::empty(),
            events: vector::empty(),
            marketplace: MarketplaceRegistry { items: vector::empty() },
            community_channels: vector::empty(),
        };

        table::add(&mut registry.daos, dao_name, dao);
    }

    // Create Task
    public entry fun create_task(
        admin: &signer,
        dao_name: String,
        title: String,
        description: String,
        bounty: u64
    ) acquires DAORegistry {
        let admin_address = signer::address_of(admin);
        let registry = borrow_global_mut<DAORegistry>(@dao_manager);
        let dao = table::borrow_mut(&mut registry.daos, dao_name);

        if (dao.admin != admin_address) {
            abort ERROR_UNAUTHORIZED
        };

        let task = Task {
            task_id: vector::length(&dao.tasks),
            title,
            description,
            bounty,
            status: string::utf8(b"Open"),
            assigned_to: option::none(),
            created_by: admin_address
        };

        vector::push_back(&mut dao.tasks, task);
    }

    // Complete Task and Transfer Bounty
    public entry fun complete_task(
        admin: &signer,
        dao_name: String,
        task_id: u64
    ) acquires DAORegistry, FungibleAssetMetadata {
        let admin_address = signer::address_of(admin);
        let registry = borrow_global_mut<DAORegistry>(@dao_manager);
        let dao = table::borrow_mut(&mut registry.daos, dao_name);

        if (dao.admin != admin_address) {
            abort ERROR_UNAUTHORIZED
        };

        let task = &mut dao.tasks[task_id];

        // Check if task has already been completed
        if (task.status == string::utf8(b"Completed")) {
            abort ERROR_TASK_ALREADY_COMPLETED
        };

        let assigned_user;
if (task.assigned_to != Option::None) {
    // If task is assigned, extract the address
    let addr = move_from(task.assigned_to);
    assigned_user = addr;
} else {
    // If no user is assigned, abort with the error
    abort ERROR_NO_ASSIGNED_USER;
};

        // Complete the task
        task.status = string::utf8(b"Completed");

        // Transfer bounty
        let fa_metadata = borrow_global<FungibleAssetMetadata>(@dao_manager);
        let user_stake_object_addr = get_user_stake_object_address(assigned_user);
        let user_stake = borrow_global_mut<UserStake>(user_stake_object_addr);
        let user_stake_store = &user_stake.stake_store;

        fungible_asset::transfer(
            admin,
            primary_fungible_store::primary_store(admin_address, fa_metadata.fa_metadata_object),
            user_stake_store,
            task.bounty
        );
    }

    // Create Event
    public entry fun create_event(
        admin: &signer,
        dao_name: String,
        title: String,
        description: String,
        date: u64,
        location: String
    ) acquires DAORegistry {
        let admin_address = signer::address_of(admin);
        let registry = borrow_global_mut<DAORegistry>(@dao_manager);
        let dao = table::borrow_mut(&mut registry.daos, dao_name);

        if (dao.admin != admin_address) {
            abort ERROR_UNAUTHORIZED
        };

        let event = DAOEvent {
            event_id: vector::length(&dao.events),
            title,
            description,
            date,
            location,
            participants: vector::empty()
        };

        vector::push_back(&mut dao.events, event);
    }

    // RSVP to Event
    public entry fun rsvp_event(
        user: &signer,
        dao_name: String,
        event_id: u64
    ) acquires DAORegistry {
        let user_address = signer::address_of(user);
        let registry = borrow_global_mut<DAORegistry>(@dao_manager);
        let dao = table::borrow_mut(&mut registry.daos, dao_name);

        let event = &mut dao.events[event_id];

        vector::push_back(&mut event.participants, user_address);
    }

    // Mint and Upload NFT or Merch to Marketplace
    public entry fun mint_and_upload_item(
        admin: &signer,
        dao_name: String,
        title: String,
        description: String,
        price: u64,
        item_type: String,
        nft_metadata: option::Option<Object<FungibleAsset>>
    ) acquires DAORegistry {
        let admin_address = signer::address_of(admin);
        let registry = borrow_global_mut<DAORegistry>(@dao_manager);
        let dao = table::borrow_mut(&mut registry.daos, dao_name);

        if (dao.admin != admin_address) {
            abort ERROR_UNAUTHORIZED
        };

        let item_id = vector::length(&dao.marketplace.items);
        let new_item = MarketplaceItem {
            item_id,
            title,
            description,
            price,
            item_type,
            creator: admin_address,
            nft_metadata,
            is_active: true,
        };

        vector::push_back(&mut dao.marketplace.items, new_item);
    }

    // Purchase an Item (NFT or Merch)
    public entry fun purchase_item(
        user: &signer,
        dao_name: String,
        item_id: u64
    ) acquires DAORegistry, FungibleAssetMetadata {
        let user_address = signer::address_of(user);
        let registry = borrow_global_mut<DAORegistry>(@dao_manager);
        let dao = table::borrow_mut(&mut registry.daos, dao_name);

        let item = &mut dao.marketplace.items[item_id];

        if (!item.is_active) {
            abort ERROR_PRODUCT_NOT_FOUND
        };

        if (item.item_type == string::utf8(b"NFT")) {
            let nft_metadata;
            if (item.nft_metadata != option::none()) {
                nft_metadata = move_from(item.nft_metadata);
            } else {
                abort ERROR_INVALID_ITEM_TYPE;
            };

            let transfer_successful = nft_transfer(user, nft_metadata);
            if (!transfer_successful) {
                abort ERROR_NFT_TRANSFER_FAILED;
            }
        } else if (item.item_type == string::utf8(b"Merch")) {
            let fa_metadata = borrow_global<FungibleAssetMetadata>(@dao_manager);
            let user_stake_store = get_user_stake_store(user_address);
            fungible_asset::transfer(
                user,
                primary_fungible_store::primary_store(user_address, fa_metadata.fa_metadata_object),
                user_stake_store,
                item.price
            );
        } else {
            abort ERROR_INVALID_ITEM_TYPE;
        };

        item.is_active = false;
    }

    // Helper function to simulate NFT transfer (to be implemented with actual NFT transfer logic)
    fun nft_transfer(user: &signer, nft_metadata: Object<FungibleAsset>): bool {
        return true;  // Simulated transfer
    }

    // Helper function to get user stake store for purchasing merch
    fun get_user_stake_store(user_address: address): Object<FungibleStore> acquires FungibleStoreController {
        let store_signer = &generate_fungible_store_signer();
        let user_stake_object_addr = get_user_stake_object_address(user_address);

        if (object::object_exists<FungibleStore>(user_stake_object_addr)) {
            let user_stake = borrow_global<FungibleStore>(user_stake_object_addr);
            return user_stake;
        } else {
            let store_object_constructor_ref = &object::create_object(signer::address_of(store_signer));
            let new_store = fungible_asset::create_store(store_object_constructor_ref, borrow_global<FungibleAssetMetadata>(@dao_manager).fa_metadata_object);
            move_to(store_signer, new_store);
            return new_store;
        }
    }
}
