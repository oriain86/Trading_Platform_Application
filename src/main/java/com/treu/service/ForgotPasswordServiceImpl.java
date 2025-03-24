package com.treu.service;

// Custom enum for defining verification types (e.g., EMAIL, SMS)
import com.treu.domain.VerificationType;
// Entity class representing a forgot password token
import com.treu.model.ForgotPasswordToken;
// Entity class representing a user
import com.treu.model.User;
// Repository interface for forgot password token data access
import com.treu.repository.ForgotPasswordRepository;
// Spring annotation for dependency injection
import org.springframework.beans.factory.annotation.Autowired;
// Spring annotation to mark this class as a service
import org.springframework.stereotype.Service;

import java.util.Optional;        // Wrapper for handling nullable values

// Marks this class as a Spring service bean
@Service
public class ForgotPasswordServiceImpl implements ForgotPasswordService {
    // Repository for performing CRUD operations on ForgotPasswordToken entities
    @Autowired
    private ForgotPasswordRepository forgotPasswordRepository;

    // Creates and saves a new forgot password token for a user
    @Override
    public ForgotPasswordToken createToken(User user,
                                           String id,
                                           String otp,
                                           VerificationType verificationType,
                                           String sendTo) {
        ForgotPasswordToken forgotPasswordToken = new ForgotPasswordToken(); // Initializes a new token instance
        forgotPasswordToken.setUser(user);          // Associates the token with the user
        forgotPasswordToken.setId(id);              // Sets the token ID
        forgotPasswordToken.setOtp(otp);            // Sets the one-time password
        forgotPasswordToken.setVerificationType(verificationType); // Sets the verification method
        forgotPasswordToken.setSendTo(sendTo);      // Sets the destination (e.g., email or phone)

        // Saves and returns the token to the database
        return forgotPasswordRepository.save(forgotPasswordToken);
    }

    // Finds a forgot password token by its ID
    @Override
    public ForgotPasswordToken findById(String id) {
        // Queries the repository for the token, returns an Optional
        Optional<ForgotPasswordToken> opt = forgotPasswordRepository.findById(id);
        return opt.orElse(null);                    // Returns the token or null if not found
    }

    // Finds a forgot password token by the associated user's ID
    @Override
    public ForgotPasswordToken findByUser(Long userId) {
        // Queries the repository for the token linked to the user ID
        return forgotPasswordRepository.findByUserId(userId);
    }

    // Deletes a forgot password token from the database
    @Override
    public void deleteToken(ForgotPasswordToken token) {
        forgotPasswordRepository.delete(token);     // Removes the specified token
    }

    // Verifies if the provided OTP matches the token's OTP
    @Override
    public boolean verifyToken(ForgotPasswordToken token, String otp) {
        return token.getOtp().equals(otp);          // Returns true if OTPs match, false otherwise
    }
}
