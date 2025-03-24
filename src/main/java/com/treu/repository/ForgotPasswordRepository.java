package com.treu.repository;

// Entity class representing a forgot password token in the system
import com.treu.model.ForgotPasswordToken;
// Spring Data JPAs repository interface providing CRUD operations
import org.springframework.data.jpa.repository.JpaRepository;

// Defines a repository interface for ForgotPasswordToken entity management
public interface ForgotPasswordRepository extends JpaRepository<ForgotPasswordToken, String> {
    // Retrieves a forgot password token by the associated user's ID
    ForgotPasswordToken findByUserId(Long userId);
}
