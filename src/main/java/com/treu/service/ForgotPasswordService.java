package com.treu.service;

// Custom enum for defining verification types (e.g., EMAIL, SMS)
import com.treu.domain.VerificationType;
// Entity class representing a forgot password token
import com.treu.model.ForgotPasswordToken;
// Entity class representing a user
import com.treu.model.User;

// Defines a service interface for managing forgot password tokens
public interface ForgotPasswordService {

    // Creates a new forgot password token with specified details
    ForgotPasswordToken createToken(User user, String id, String otp,
                                    VerificationType verificationType, String sendTo);

    // Retrieves a forgot password token by its ID
    ForgotPasswordToken findById(String id);

    // Retrieves a forgot password token by the associated user's ID
    ForgotPasswordToken findByUser(Long userId);

    // Deletes a specified forgot password token
    void deleteToken(ForgotPasswordToken token);

    // Verifies if the provided OTP matches the token's OTP
    boolean verifyToken(ForgotPasswordToken token, String otp);
}
