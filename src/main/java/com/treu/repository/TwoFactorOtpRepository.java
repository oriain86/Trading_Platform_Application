package com.treu.repository;

// Entity class representing a two-factor OTP in the system
import com.treu.model.TwoFactorOTP;
// Spring Data JPAs repository interface providing CRUD operations
import org.springframework.data.jpa.repository.JpaRepository;

// Defines a repository interface for TwoFactorOTP entity management
public interface TwoFactorOtpRepository extends JpaRepository<TwoFactorOTP, String> {

    // Retrieves a two-factor OTP by the associated user's ID
    TwoFactorOTP findByUserId(Long userId);
}
