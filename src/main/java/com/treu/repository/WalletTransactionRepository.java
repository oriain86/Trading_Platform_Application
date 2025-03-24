package com.treu.repository;

// Entity class representing a wallet in the system
import com.treu.model.Wallet;
// Entity class representing a wallet transaction in the system
import com.treu.model.WalletTransaction;
// Spring Data JPAs repository interface providing CRUD operations
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;             // Interface for ordered collections

// Defines a repository interface for WalletTransaction entity management
public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Long> {

    // Retrieves a list of wallet transactions for a specific wallet, ordered by date in descending order
    List<WalletTransaction> findByWalletOrderByDateDesc(Wallet wallet);
}
