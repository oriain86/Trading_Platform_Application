package com.treu.service;

// Entity class representing a two-factor OTP
import com.treu.model.TwoFactorOTP;
// Entity class representing a user
import com.treu.model.User;
// Repository interface for two-factor OTP data access
import com.treu.repository.TwoFactorOtpRepository;
// Spring annotation for dependency injection
import org.springframework.beans.factory.annotation.Autowired;
// Spring annotation to mark this class as a service
import org.springframework.stereotype.Service;

import java.util.Optional;        // Wrapper for handling nullable values
import java.util.UUID;           // Utility for generating unique identifiers

// Marks this class as a Spring service bean
@Service
public class TwoFactorOtpServiceImpl implements TwoFactorOtpService {

    // Repository for performing CRUD operations on TwoFactorOTP entities
    @Autowired
    private TwoFactorOtpRepository twoFactorOtpRepository;

    // Creates and saves a new two-factor OTP for a user with OTP and JWT
    @Override
    public TwoFactorOTP createTwoFactorOtp(User user, String otp, String jwt) {
        UUID uuid = UUID.randomUUID();          // Generates a random UUID
        String id = uuid.toString();            // Converts UUID to string for ID

        TwoFactorOTP twoFactorOTP = new TwoFactorOTP(); // Initializes a new TwoFactorOTP instance
        twoFactorOTP.setId(id);                 // Sets the unique ID
        twoFactorOTP.setUser(user);             // Associates the OTP with the user
        twoFactorOTP.setOtp(otp);               // Sets the one-time password
        twoFactorOTP.setJwt(jwt);               // Sets the JSON Web Token

        // Saves and returns the two-factor OTP entity
        return twoFactorOtpRepository.save(twoFactorOTP);
    }

    // Finds a two-factor OTP by the associated user's ID
    @Override
    public TwoFactorOTP findByUser(Long userId) {
        // Queries the repository for the OTP linked to the user ID
        return twoFactorOtpRepository.findByUserId(userId);
    }

    // Finds a two-factor OTP by its ID
    @Override
    public TwoFactorOTP findById(String id) {
        // Queries the repository for the OTP, returns an Optional
        Optional<TwoFactorOTP> twoFactorOtp = twoFactorOtpRepository.findById(id);
        return twoFactorOtp.orElse(null);       // Returns the OTP or null if not found
    }

    // Verifies if the provided OTP matches the stored OTP
    @Override
    public boolean verifyTwoFactorOtp(TwoFactorOTP twoFactorOtp, String otp) {
        return twoFactorOtp.getOtp().equals(otp); // Returns true if OTPs match, false otherwise
    }

    // Deletes a specified two-factor OTP
    @Override
    public void deleteTwoFactorOtp(TwoFactorOTP twoFactorOTP) {
        twoFactorOtpRepository.delete(twoFactorOTP); // Removes the OTP from the database
    }
}
