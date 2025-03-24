package com.treu.service;

// Custom enum for defining verification types (e.g., EMAIL, SMS)
import com.treu.domain.VerificationType;
// Entity class representing a user
import com.treu.model.User;
// Entity class representing a verification code
import com.treu.model.VerificationCode;

// Defines a service interface for managing verification-related operations
public interface VerificationService {
    // Sends a verification OTP to a user based on the specified verification type
    VerificationCode sendVerificationOTP(User user, VerificationType verificationType);

    // Retrieves a verification code by its ID, throws an exception if not found or error occurs
    VerificationCode findVerificationById(Long id) throws Exception;

    // Finds the verification code associated with a specific user, throws an exception if not found or error occurs
    VerificationCode findUsersVerification(User user) throws Exception;

    // Verifies if the provided OTP matches the one in the verification code
    Boolean VerifyOtp(String opt, VerificationCode verificationCode);

    // Deletes a specified verification code
    void deleteVerification(VerificationCode verificationCode);
}
