<img width="1888" height="878" alt="image" src="https://github.com/user-attachments/assets/df84f98a-b72d-4103-97c4-55d32d7345bb" />
# stellar-dapp
https://stellar.expert/explorer/testnet/contract/CDTX3DJ3HF7FUVDRFBHNVD74JTU5OTEXM554BCTZFLKWTEJ2WHVM2NBL

# 📡 Decentralized Messaging on Stellar (Soroban)

## 🚀 Project Description
This project is a decentralized messaging smart contract built using Soroban on the Stellar network. It enables users to send and store messages directly on-chain without relying on centralized servers.

## 💡 What It Does
- Allows users to send messages linked to their wallet address
- Stores messages securely on the blockchain
- Enables retrieval of messages for any user
- Ensures transparency and immutability

## ✨ Features
- 🔐 Fully decentralized (no central server)
- 🧾 On-chain message storage
- 👤 Address-based identity (wallet = user)
- ⚡ Fast & low-cost using Stellar Soroban
- 🔎 Public message retrieval

## 🛠 Tech Stack
- Soroban Smart Contracts (Rust)
- Stellar Blockchain
- Freighter Wallet (for interaction)
- Stellar CLI

## 📦 Contract Functions
### 1. `send_message`
Send a message from your wallet.

**Parameters:**
- `user`: Address
- `message`: Symbol

### 2. `get_messages`
Fetch messages of a user.

**Parameters:**
- `user`: Address

## 🌐 Deployed Smart Contract Link
👉 (Add your deployed contract link here)

Example:
https://stellar.expert/explorer/testnet/contract/XXXXXXXXXXXXXXXX

## 🧪 How to Run Locally
1. Install Soroban CLI
2. Build contract:
   ```bash
   cargo build --target wasm32-unknown-unknown --release
