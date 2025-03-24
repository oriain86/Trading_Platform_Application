package com.treu.service;

// Utility class for JWT token operations
import com.treu.config.JwtProvider;
// Custom enum for defining verification types (e.g., EMAIL, SMS)
import com.treu.domain.VerificationType;
// Custom exception for user-related errors
import com.treu.exception.UserException;
// Entity class for two-factor authentication settings
import com.treu.model.TwoFactorAuth;
// Entity class representing a user
import com.treu.model.User;
// Repository interface for user data access
import com.treu.repository.UserRepository;
// Spring annotation for dependency injection
import org.springframework.beans.factory.annotation.Autowired;
// Spring interface for password encoding
import org.springframework.security.crypto.password.PasswordEncoder;
// Spring annotation to mark this class as a service
import org.springframework.stereotype.Service;

import java.util.Optional;        // Wrapper for handling nullable values

// Marks this class as a Spring service bean
@Service
public class UserServiceImpl implements UserService {

    // Repository for accessing and saving user data
    @Autowired
    private UserRepository userRepository;

    // Password encoder for securing user passwords
    @Autowired
    private PasswordEncoder passwordEncoder;

    // Finds a user's profile using a JWT token
    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {
        // Extracts email from the JWT token
        String email = JwtProvider.getEmailFromJwtToken(jwt);

        // Queries the repository for the user by email
        User user = userRepository.findByEmail(email);

        // Throws exception if user is not found
        if (user == null) {
            throw new UserException("user not exist with email " + email);
        }
        return user; // Returns the found user
    }

    // Finds a user by their email address
    @Override
    public User findUserByEmail(String username) throws UserException {
        // Queries the repository for the user by email
        User user = userRepository.findByEmail(username);

        // Returns user if found
        if (user != null) {
            return user;
        }

        // Throws exception if user is not found
        throw new UserException("user not exist with username " + username);
    }

    // Finds a user by their ID
    @Override
    public User findUserById(Long userId) throws UserException {
        // Queries the repository for the user by ID, returns an Optional
        Optional<User> opt = userRepository.findById(userId);

        // Throws exception if user is not found
        if (opt.isEmpty()) {
            throw new UserException("user not found with id " + userId);
        }
        return opt.get(); // Returns the found user
    }

    // Verifies a user's account by setting the verified flag
    @Override
    public User verifyUser(User user) throws UserException {
        user.setVerified(true);         // Marks the user as verified
        return userRepository.save(user); // Saves and returns the updated user
    }

    // Enables two-factor authentication for a user
    @Override
    public User enabledTwoFactorAuthentication(VerificationType verificationType, String sendTo, User user) throws UserException {
        TwoFactorAuth twoFactorAuth = new TwoFactorAuth(); // Creates a new TwoFactorAuth instance
        twoFactorAuth.setEnabled(true);                   // Enables two-factor authentication
        twoFactorAuth.setSendTo(verificationType);        // Sets the verification method (e.g., EMAIL, SMS)

        user.setTwoFactorAuth(twoFactorAuth);             // Associates two-factor settings with the user
        return userRepository.save(user);                 // Saves and returns the updated user
    }

    // Updates a user's password with a new encoded password
    @Override
    public User updatePassword(User user, String newPassword) {
        // Encodes the new password and sets it
        user.setPassword(passwordEncoder.encode(newPassword));
        return userRepository.save(user);                 // Saves and returns the updated user
    }

    // Sends an OTP for password update (currently unimplemented)
    @Override
    public void sendUpdatePasswordOtp(String email, String otp) {

    }
}
