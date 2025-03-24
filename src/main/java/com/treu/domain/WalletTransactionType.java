package com.treu.domain;

// Defines an enumeration for the types of transactions that can occur in a wallet
public enum WalletTransactionType {
    // Represents a withdrawal of funds from the wallet (e.g., to a bank account)
    WITHDRAWAL,

    // Represents a transfer of funds between two wallets within the system
    WALLET_TRANSFER,

    // Represents adding money to the wallet (e.g., via a deposit)
    ADD_MONEY,

    // Represents a purchase of an asset (e.g., buying a cryptocurrency)
    BUY_ASSET,

    // Represents a sale of an asset (e.g., selling a cryptocurrency)
    SELL_ASSET
}
