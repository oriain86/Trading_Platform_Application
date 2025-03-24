package com.treu.service;

// Custom enum for defining verification types (e.g., EMAIL, SMS)
import com.treu.domain.VerificationType;
// Custom exception for user-related errors
import com.treu.exception.UserException;
// Entity class representing a user
import com.treu.model.User;

// Defines a service interface for managing user-related operations
public interface UserService {

    // Retrieves a user's profile using a JSON Web Token (JWT), throws UserException on error
    public User findUserProfileByJwt(String jwt) throws UserException;

    // Finds a user by their email address, throws UserException if not found or error occurs
    public User findUserByEmail(String email) throws UserException;

    // Finds a user by their ID, throws UserException if not found or error occurs
    public User findUserById(Long userId) throws UserException;

    // Verifies a user's account, throws UserException on error
    public User verifyUser(User user) throws UserException;

    // Enables two-factor authentication for a user with a verification type and destination, throws UserException on error
    public User enabledTwoFactorAuthentication(VerificationType verificationType,
                                               String sendTo, User user) throws UserException;

    // Commented-out method: Would retrieve a list of pending restaurant owners
//	public List<User> getPenddingRestaurantOwner();

    // Updates a user's password with a new password, returns the updated user
    User updatePassword(User user, String newPassword);

    // Sends an OTP for updating a user's password to the specified email
    void sendUpdatePasswordOtp(String email, String otp);

    // Commented-out method: Would send a password reset email to a user
//	void sendPasswordResetEmail(User user);
}
