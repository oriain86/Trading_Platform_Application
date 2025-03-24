package com.treu.repository;

// Entity class representing a wallet in the system
import com.treu.model.Wallet;
// Spring Data JPA's repository interface providing CRUD operations
import org.springframework.data.jpa.repository.JpaRepository;

// Defines a repository interface for Wallet entity management
public interface WalletRepository extends JpaRepository<Wallet, Long> {

    // Retrieves a wallet by the associated user's ID
    public Wallet findByUserId(Long userId);
}
