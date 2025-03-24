package com.treu.service;

// Custom enum for defining wallet transaction types (e.g., DEPOSIT, WITHDRAWAL)
import com.treu.domain.WalletTransactionType;
// Entity class representing a wallet
import com.treu.model.Wallet;
// Entity class representing a wallet transaction
import com.treu.model.WalletTransaction;

import java.util.List;             // Interface for ordered collections

// Defines a service interface for managing wallet transaction-related operations
public interface WalletTransactionService {
    // Creates a new wallet transaction with specified details
    WalletTransaction createTransaction(Wallet wallet,
                                        WalletTransactionType type,
                                        String transferId,
                                        String purpose,
                                        Long amount);

    // Retrieves a list of transactions for a wallet, filtered by transaction type
    List<WalletTransaction> getTransactions(Wallet wallet, WalletTransactionType type);
}
