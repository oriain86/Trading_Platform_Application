package com.treu.service;

// Custom enum for defining wallet transaction types (e.g., DEPOSIT, WITHDRAWAL)
import com.treu.domain.WalletTransactionType;
// Entity class representing a wallet
import com.treu.model.Wallet;
// Entity class representing a wallet transaction
import com.treu.model.WalletTransaction;
// Repository interface for wallet transaction data access
import com.treu.repository.WalletTransactionRepository;
// Spring annotation for dependency injection
import org.springframework.beans.factory.annotation.Autowired;
// Spring annotation to mark this class as a service
import org.springframework.stereotype.Service;

import java.time.LocalDate;       // Date class for transaction timestamps
import java.util.List;           // Interface for ordered collections

// Marks this class as a Spring service bean
@Service
public class WalletTransactionServiceImpl implements WalletTransactionService {

    // Repository for performing CRUD operations on WalletTransaction entities
    @Autowired
    private WalletTransactionRepository walletTransactionRepository;

    // Creates and saves a new wallet transaction with specified details
    @Override
    public WalletTransaction createTransaction(Wallet wallet,
                                               WalletTransactionType type,
                                               String transferId,
                                               String purpose,
                                               Long amount) {
        WalletTransaction transaction = new WalletTransaction(); // Creates a new transaction instance
        transaction.setWallet(wallet);         // Associates the transaction with the wallet
        transaction.setDate(LocalDate.now());  // Sets the current date
        transaction.setType(type);             // Sets the transaction type (e.g., DEPOSIT, WITHDRAWAL)
        transaction.setTransferId(transferId); // Sets the transfer ID (e.g., reference number)
        transaction.setPurpose(purpose);       // Sets the purpose or description of the transaction
        transaction.setAmount(amount);         // Sets the transaction amount

        // Saves and returns the transaction
        return walletTransactionRepository.save(transaction);
    }

    // Retrieves a list of transactions for a wallet, ordered by date descending
    @Override
    public List<WalletTransaction> getTransactions(Wallet wallet, WalletTransactionType type) {
        // Fetches transactions for the wallet, ignoring the type filter, ordered by date descending
        return walletTransactionRepository.findByWalletOrderByDateDesc(wallet);
    }
}
