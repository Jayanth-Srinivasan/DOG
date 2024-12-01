module user_manager_addr::DAOProfileManager {
    use std::string;
    use std::vector;
    use std::signer;
    use std::option::{Self, Option};

    /// Struct to represent a user profile
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

    /// Resource to store all registered user profiles
    struct UserProfileRegistry has key {
        registered_profiles: vector<UserProfile>,
    }

    /// Global storage for the last queried profile
    struct LastQueriedProfile has key {
        profile: Option<UserProfile>,
    }

    /// Initialize the contract and the user profile registry
    public entry fun initialize(account: &signer) {
        let profile_registry = UserProfileRegistry {
            registered_profiles: vector::empty(),
        };
        move_to(account, profile_registry);

        // Initialize last queried profile
        let last_queried = LastQueriedProfile {
            profile: option::none(),
        };
        move_to(account, last_queried);
    }

    /// Add a user profile with all fields
    public entry fun register_profile(
        account: &signer,
        full_name: string::String,
        profile_description: string::String,
        image_link: string::String,
        account_handle: string::String,
        user_capabilities: vector<string::String>,
    ) acquires UserProfileRegistry {
        let user_address = signer::address_of(account);
        let registry = borrow_global_mut<UserProfileRegistry>(@user_manager_addr);

        let new_profile = UserProfile {
            full_name,
            user_address,
            profile_description,
            image_link,
            account_handle,
            user_capabilities,
            dao_contributions: vector::empty(),
            dao_administrations: vector::empty(),
        };

        vector::push_back(&mut registry.registered_profiles, new_profile);
    }

    /// Entry function to check if a profile exists
    public entry fun check_profile_exists(_account: &signer, user_address: address) acquires UserProfileRegistry, LastQueriedProfile {
        let registry = borrow_global<UserProfileRegistry>(@user_manager_addr);
        let profiles = &registry.registered_profiles;
        let last_queried = borrow_global_mut<LastQueriedProfile>(@user_manager_addr);

        let i = 0;
        let found = false;
        while (i < vector::length(profiles)) {
            let profile = vector::borrow(profiles, i);
            if (profile.user_address == user_address) {
                last_queried.profile = option::some(*profile);
                found = true;
                break
            };
            i = i + 1;
        };

        // If no profile found, set to none
        if (!found) {
            last_queried.profile = option::none();
        }
    }

    /// Entry function to retrieve a profile and store it globally
    public entry fun retrieve_profile(_account: &signer, user_address: address) acquires UserProfileRegistry, LastQueriedProfile {
        let registry = borrow_global<UserProfileRegistry>(@user_manager_addr);
        let profiles = &registry.registered_profiles;
        let last_queried = borrow_global_mut<LastQueriedProfile>(@user_manager_addr);

        let i = 0;
        let found = false;
        while (i < vector::length(profiles)) {
            let profile = vector::borrow(profiles, i);
            if (profile.user_address == user_address) {
                last_queried.profile = option::some(*profile);
                found = true;
                break
            };
            i = i + 1;
        };

        // If no profile found, set to none
        if (!found) {
            last_queried.profile = option::none();
        }
    }

    /// View function to get the last queried profile
    public fun get_last_queried_profile(): Option<UserProfile> acquires LastQueriedProfile {
        borrow_global<LastQueriedProfile>(@user_manager_addr).profile
    }

    /// Check if a user profile exists by address
    public fun does_profile_exist(user_address: address): bool acquires UserProfileRegistry {
        let registry = borrow_global<UserProfileRegistry>(@user_manager_addr);
        let profiles = &registry.registered_profiles;

        let i = 0;
        while (i < vector::length(profiles)) {
            let profile = vector::borrow(profiles, i);
            if (profile.user_address == user_address) {
                return true
            };
            i = i + 1;
        };
        false
    }

    /// Retrieve a user profile by address (returns Option)
    public fun find_profile(user_address: address): Option<UserProfile> acquires UserProfileRegistry {
        let registry = borrow_global<UserProfileRegistry>(@user_manager_addr);
        let profiles = &registry.registered_profiles;

        let i = 0;
        while (i < vector::length(profiles)) {
            let profile = vector::borrow(profiles, i);
            if (profile.user_address == user_address) {
                return option::some(*profile)
            };
            i = i + 1;
        };
        option::none()
    }

    /// Add a DAO to the user's contributor list
    public entry fun add_dao_contribution(account: &signer, dao_name: string::String) acquires UserProfileRegistry {
        let user_address = signer::address_of(account);
        let registry = borrow_global_mut<UserProfileRegistry>(@user_manager_addr);
        let profiles = &mut registry.registered_profiles;

        let i = 0;
        while (i < vector::length(profiles)) {
            let profile_ref = vector::borrow_mut(profiles, i);
            if (profile_ref.user_address == user_address) {
                vector::push_back(&mut profile_ref.dao_contributions, dao_name);
                return
            };
            i = i + 1;
        };
        
        abort 0x1 // Profile not found
    }

    /// Add a DAO to the user's admin list
    public entry fun add_dao_administration(account: &signer, dao_name: string::String) acquires UserProfileRegistry {
        let user_address = signer::address_of(account);
        let registry = borrow_global_mut<UserProfileRegistry>(@user_manager_addr);
        let profiles = &mut registry.registered_profiles;

        let i = 0;
        while (i < vector::length(profiles)) {
            let profile_ref = vector::borrow_mut(profiles, i);
            if (profile_ref.user_address == user_address) {
                vector::push_back(&mut profile_ref.dao_administrations, dao_name);
                return
            };
            i = i + 1;
        };
        
        abort 0x1 // Profile not found
    }
}