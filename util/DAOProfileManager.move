module dao_manager::DAOManager {
    use aptos_std::{vector, string, option, signer};

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

    // Structs
    struct Task has store, drop {
        task_id: u64,
        title: string::String,
        description: string::String,
        bounty: u64,
        status: string::String, // Open, In Progress, Completed
        assigned_to: option::Option<address>,
        created_by: address
    }

    struct DAOEvent has store, drop {
        event_id: u64,
        title: string::String,
        description: string::String,
        date: u64,
        location: string::String,
        participants: vector<address>  // List of users who RSVP'd to the event
    }

    struct MarketplaceItem has store, drop {
        item_id: u64,
        title: string::String,
        description: string::String,
        price: u64,
        item_type: string::String, // "NFT" or "Merch"
        creator: address, // Creator/owner (Admin)
        is_active: bool, // Item visibility (Active/Inactive)
    }

    struct MarketplaceRegistry has key {
        items: vector<MarketplaceItem>
    }

    struct DAO has key, store {
        name: string::String,
        admin: address,
        tasks: vector<Task>,
        events: vector<DAOEvent>,
        marketplace: MarketplaceRegistry,
        community_channels: vector<CommunityChannel>
    }

    struct CommunityChannel has store {
        channel_id: u64,
        name: string::String,
        description: string::String,
        platform: string::String, // Discord, Telegram, etc.
        invite_link: string::String
    }

    struct DAORegistry has key {
        daos: Table<string::String, DAO>
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
        dao_name: string::String
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
        dao_name: string::String,
        title: string::String,
        description: string::String,
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
            status: string::String::utf8(b"Open"),
            assigned_to: option::none(),
            created_by: admin_address
        };

        vector::push_back(&mut dao.tasks, task);
    }

    // Complete Task and Transfer Bounty (Mocked)
    public entry fun complete_task(
        admin: &signer,
        dao_name: string::String,
        task_id: u64
    ) acquires DAORegistry {
        let admin_address = signer::address_of(admin);
        let registry = borrow_global_mut<DAORegistry>(@dao_manager);
        let dao = table::borrow_mut(&mut registry.daos, dao_name);

        if (dao.admin != admin_address) {
            abort ERROR_UNAUTHORIZED
        };

        let task = &mut dao.tasks[task_id];

        if (task.status == string::String::utf8(b"Completed")) {
            abort ERROR_TASK_ALREADY_COMPLETED
        };

        let assigned_user = match task.assigned_to {
            option::some(addr) => addr,
            option::none => abort ERROR_NO_ASSIGNED_USER,
        };

        task.status = string::String::utf8(b"Completed");

        // Simulated bounty transfer (mocked)
        return;
    }

    // Mint and Upload Item to Marketplace
    public entry fun mint_and_upload_item(
        admin: &signer,
        dao_name: string::String,
        title: string::String,
        description: string::String,
        price: u64,
        item_type: string::String
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
            is_active: true,
        };

        vector::push_back(&mut dao.marketplace.items, new_item);
    }

    // Purchase an Item (NFT or Merch)
    public entry fun purchase_item(
        user: &signer,
        dao_name: string::String,
        item_id: u64
    ) acquires DAORegistry {
        let user_address = signer::address_of(user);
        let registry = borrow_global_mut<DAORegistry>(@dao_manager);
        let dao = table::borrow_mut(&mut registry.daos, dao_name);

        let item = &mut dao.marketplace.items[item_id];

        if (!item.is_active) {
            abort ERROR_PRODUCT_NOT_FOUND
        };

        if (item.item_type == string::String::utf8(b"NFT")) {
            // Simulate NFT transfer (mocked)
            return true;  // Simulated success
        } else if (item.item_type == string::String::utf8(b"Merch")) {
            // Simulate token transfer (mocked)
            return true;  // Simulated success
        } else {
            abort ERROR_INVALID_ITEM_TYPE;
        };
    }

    // Helper function to simulate NFT transfer (mocked)
    fun nft_transfer(user: &signer): bool {
        // Simulate the transfer
        return true;
    }
}
