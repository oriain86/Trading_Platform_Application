package com.treu.repository;

// Entity class representing a withdrawal in the system
import com.treu.model.Withdrawal;
// Spring Data JPAs repository interface providing CRUD operations
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;             // Interface for ordered collections

// Defines a repository interface for Withdrawal entity management
public interface WithdrawalRepository extends JpaRepository<Withdrawal, Long> {
    // Retrieves a list of withdrawals for a specific user by their user ID
    List<Withdrawal> findByUserId(Long userId);
}
