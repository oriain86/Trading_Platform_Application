package com.treu.service;

// Custom enum for defining verification types (e.g., EMAIL, SMS)
import com.treu.domain.VerificationType;
// Entity class representing a user
import com.treu.model.User;
// Entity class representing a verification code
import com.treu.model.VerificationCode;
// Repository interface for verification code data access
import com.treu.repository.VerificationRepository;
// Utility class for generating OTPs
import com.treu.utils.OtpUtils;
// Spring annotation for dependency injection
import org.springframework.beans.factory.annotation.Autowired;
// Spring annotation to mark this class as a service
import org.springframework.stereotype.Service;

import java.util.Optional;        // Wrapper for handling nullable values

// Marks this class as a Spring service bean
@Service
public class VerificationServiceImpl implements VerificationService {

    // Repository for performing CRUD operations on VerificationCode entities
    @Autowired
    private VerificationRepository verificationRepository;

    // Sends a verification OTP by creating and saving a VerificationCode
    @Override
    public VerificationCode sendVerificationOTP(User user, VerificationType verificationType) {
        VerificationCode verificationCode = new VerificationCode(); // Creates a new VerificationCode instance

        verificationCode.setOtp(OtpUtils.generateOTP()); // Generates and sets a random OTP
        verificationCode.setUser(user);                  // Associates the code with the user
        verificationCode.setVerificationType(verificationType); // Sets the verification method

        // Saves and returns the verification code
        return verificationRepository.save(verificationCode);
    }

    // Finds a verification code by its ID, throws exception if not found
    @Override
    public VerificationCode findVerificationById(Long id) throws Exception {
        // Queries the repository for the verification code by ID
        Optional<VerificationCode> verificationCodeOption = verificationRepository.findById(id);
        if (verificationCodeOption.isEmpty()) {          // Checks if the code exists
            throw new Exception("verification not found"); // Throws exception if not found
        }
        return verificationCodeOption.get();             // Returns the found verification code
    }

    // Finds a user's verification code by their ID
    @Override
    public VerificationCode findUsersVerification(User user) throws Exception {
        // Queries the repository for the verification code by user ID
        return verificationRepository.findByUserId(user.getId());
    }

    // Verifies if the provided OTP matches the stored OTP in the verification code
    @Override
    public Boolean VerifyOtp(String opt, VerificationCode verificationCode) {
        return opt.equals(verificationCode.getOtp());    // Returns true if OTPs match, false otherwise
    }

    // Deletes a specified verification code
    @Override
    public void deleteVerification(VerificationCode verificationCode) {
        verificationRepository.delete(verificationCode); // Removes the verification code from the database
    }
}
