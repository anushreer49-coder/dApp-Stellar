#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Symbol, Vec, Map, Address};

#[contract]
pub struct MessagingContract;

#[contractimpl]
impl MessagingContract {

    // Send a message
    pub fn send_message(env: Env, user: Address, message: Symbol) {
        user.require_auth();

        let mut messages: Map<Address, Vec<Symbol>> =
            env.storage().instance().get(&Symbol::short("msgs"))
            .unwrap_or(Map::new(&env));

        let mut user_msgs = messages.get(user.clone()).unwrap_or(Vec::new(&env));
        user_msgs.push_back(message);

        messages.set(user, user_msgs);
        env.storage().instance().set(&Symbol::short("msgs"), &messages);
    }

    // Get messages of a user
    pub fn get_messages(env: Env, user: Address) -> Vec<Symbol> {
        let messages: Map<Address, Vec<Symbol>> =
            env.storage().instance().get(&Symbol::short("msgs"))
            .unwrap_or(Map::new(&env));

        messages.get(user).unwrap_or(Vec::new(&env))
    }
}