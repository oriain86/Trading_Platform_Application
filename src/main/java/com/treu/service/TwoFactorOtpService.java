package com.treu.service;

// Entity class representing a two-factor OTP
import com.treu.model.TwoFactorOTP;
// Entity class representing a user
import com.treu.model.User;

// Defines a service interface for managing two-factor OTP-related operations
public interface TwoFactorOtpService {

    // Creates a new two-factor OTP for a user with the specified OTP and JWT
    TwoFactorOTP createTwoFactorOtp(User user, String otp, String jwt);

    // Finds a two-factor OTP by the associated user's ID
    TwoFactorOTP findByUser(Long userId);

    // Finds a two-factor OTP by its ID
    TwoFactorOTP findById(String id);

    // Verifies if the provided OTP matches the one stored in the two-factor OTP
    boolean verifyTwoFactorOtp(TwoFactorOTP twoFactorOtp, String otp);

    // Deletes a specified two-factor OTP
    void deleteTwoFactorOtp(TwoFactorOTP twoFactorOTP);
}
