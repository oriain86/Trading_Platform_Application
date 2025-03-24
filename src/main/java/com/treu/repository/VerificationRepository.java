package com.treu.repository;

// Entity class representing a verification code in the system
import com.treu.model.VerificationCode;
// Spring Data JPAs repository interface providing CRUD operations
import org.springframework.data.jpa.repository.JpaRepository;

// Defines a repository interface for VerificationCode entity management
public interface VerificationRepository extends JpaRepository<VerificationCode, Long> {
    // Retrieves a verification code by the associated user's ID
    VerificationCode findByUserId(Long userId);
}
