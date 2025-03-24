package com.treu.controller;

import com.treu.domain.VerificationType;
import com.treu.exception.UserException;
import com.treu.model.ForgotPasswordToken;
import com.treu.model.User;
import com.treu.model.VerificationCode;
import com.treu.request.ResetPasswordRequest;
import com.treu.request.UpdatePasswordRequest;
import com.treu.response.ApiResponse;
import com.treu.response.AuthResponse;
import com.treu.service.EmailService;
import com.treu.service.ForgotPasswordService;
import com.treu.service.UserService;
import com.treu.service.VerificationService;
import com.treu.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

// Marks this class as a REST controller, handling user-related requests
@RestController
public class UserController {

    @Autowired private UserService userService;              // Service for user-related operations
    @Autowired private VerificationService verificationService; // Service for verification code management
    @Autowired private ForgotPasswordService forgotPasswordService; // Service for forgot password functionality
    @Autowired private EmailService emailService;           // Service for sending emails

    // Handles GET requests to retrieve the authenticated user's profile
    @GetMapping("/api/users/profile")
    public ResponseEntity<User> getUserProfileHandler(
            @RequestHeader("Authorization") String jwt) throws UserException {
        // Retrieves the user associated with the JWT
        User user = userService.findUserProfileByJwt(jwt);
        user.setPassword(null); // Removes password from the response for security
        // Returns the user with HTTP 202 (Accepted)
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }

    // Handles GET requests to find a user by ID
    @GetMapping("/api/users/{userId}")
    public ResponseEntity<User> findUserById(
            @PathVariable Long userId,                  // User ID from the URL path
            @RequestHeader("Authorization") String jwt) throws UserException {
        // Fetches the user by ID
        User user = userService.findUserById(userId);
        user.setPassword(null); // Removes password from the response for security
        // Returns the user with HTTP 202 (Accepted)
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }

    // Handles GET requests to find a user by email
    @GetMapping("/api/users/email/{email}")
    public ResponseEntity<User> findUserByEmail(
            @PathVariable String email,                 // Email from the URL path
            @RequestHeader("Authorization") String jwt) throws UserException {
        // Fetches the user by email
        User user = userService.findUserByEmail(email);
        // Returns the user with HTTP 202 (Accepted)
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }

    // Handles PATCH requests to enable two-factor authentication with OTP verification
    @PatchMapping("/api/users/enable-two-factor/verify-otp/{otp}")
    public ResponseEntity<User> enabledTwoFactorAuthentication(
            @RequestHeader("Authorization") String jwt,
            @PathVariable String otp                    // OTP from the URL path
    ) throws Exception {
        // Retrieves the user associated with the JWT
        User user = userService.findUserProfileByJwt(jwt);
        // Fetches the user's verification code
        VerificationCode verificationCode = verificationService.findUsersVerification(user);
        // Determines the verification method (email or mobile)
        String sendTo = verificationCode.getVerificationType().equals(VerificationType.EMAIL)
                ? verificationCode.getEmail() : verificationCode.getMobile();
        // Verifies the provided OTP
        boolean isVerified = verificationService.VerifyOtp(otp, verificationCode);
        if (isVerified) {
            // Enables 2FA for the user and deletes the verification code
            User updatedUser = userService.enabledTwoFactorAuthentication(verificationCode.getVerificationType(), sendTo, user);
            verificationService.deleteVerification(verificationCode);
            return ResponseEntity.ok(updatedUser);
        }
        throw new Exception("wrong otp");
    }

    // Handles PATCH requests to reset a user's password after OTP verification
    @PatchMapping("/auth/users/reset-password/verify-otp")
    public ResponseEntity<ApiResponse> resetPassword(
            @RequestParam String id,                    // ForgotPasswordToken ID from query parameter
            @RequestBody ResetPasswordRequest req       // New password and OTP from request body
    ) throws Exception {
        // Retrieves the forgot password token by ID
        ForgotPasswordToken forgotPasswordToken = forgotPasswordService.findById(id);
        // Verifies the OTP against the token
        boolean isVerified = forgotPasswordService.verifyToken(forgotPasswordToken, req.getOtp());
        if (isVerified) {
            // Updates the user's password and returns a success response
            userService.updatePassword(forgotPasswordToken.getUser(), req.getPassword());
            ApiResponse apiResponse = new ApiResponse();
            apiResponse.setMessage("password updated successfully");
            return ResponseEntity.ok(apiResponse);
        }
        throw new Exception("wrong otp");
    }

    // Handles POST requests to send an OTP for password reset
    @PostMapping("/auth/users/reset-password/send-otp")
    public ResponseEntity<AuthResponse> sendUpdatePasswordOTP(
            @RequestBody UpdatePasswordRequest req      // Request containing email/mobile and verification type
    ) throws Exception {
        // Fetches the user by the provided email/mobile
        User user = userService.findUserByEmail(req.getSendTo());
        // Generates a random OTP and unique ID
        String otp = OtpUtils.generateOTP();
        UUID uuid = UUID.randomUUID();
        String id = uuid.toString();
        // Checks for an existing forgot password token
        ForgotPasswordToken token = forgotPasswordService.findByUser(user.getId());
        if (token == null) {
            // Creates a new token if none exists
            token = forgotPasswordService.createToken(user, id, otp, req.getVerificationType(), req.getSendTo());
        }
        // Sends the OTP via email if the verification type is EMAIL
        if (req.getVerificationType().equals(VerificationType.EMAIL)) {
            emailService.sendVerificationOtpEmail(user.getEmail(), token.getOtp());
        }
        // Returns a response with the token ID and success message
        AuthResponse res = new AuthResponse();
        res.setSession(token.getId());
        res.setMessage("Password Reset OTP sent successfully.");
        return ResponseEntity.ok(res);
    }

    // Handles PATCH requests to verify a user's account with an OTP
    @PatchMapping("/api/users/verification/verify-otp/{otp}")
    public ResponseEntity<User> verifyOTP(
            @RequestHeader("Authorization") String jwt,
            @PathVariable String otp                    // OTP from the URL path
    ) throws Exception {
        // Retrieves the user associated with the JWT
        User user = userService.findUserProfileByJwt(jwt);
        // Fetches the user's verification code
        VerificationCode verificationCode = verificationService.findUsersVerification(user);
        // Verifies the provided OTP
        boolean isVerified = verificationService.VerifyOtp(otp, verificationCode);
        if (isVerified) {
            // Deletes the verification code and marks the user as verified
            verificationService.deleteVerification(verificationCode);
            User verifiedUser = userService.verifyUser(user);
            return ResponseEntity.ok(verifiedUser);
        }
        throw new Exception("wrong otp");
    }

    // Handles POST requests to send a verification OTP
    @PostMapping("/api/users/verification/{verificationType}/send-otp")
    public ResponseEntity<String> sendVerificationOTP(
            @PathVariable VerificationType verificationType, // Type of verification (e.g., EMAIL, MOBILE)
            @RequestHeader("Authorization") String jwt       // JWT from the Authorization header
    ) throws Exception {
        // Retrieves the user associated with the JWT
        User user = userService.findUserProfileByJwt(jwt);
        // Checks for an existing verification code
        VerificationCode verificationCode = verificationService.findUsersVerification(user);
        if (verificationCode == null) {
            // Sends a new verification OTP if none exists
            verificationCode = verificationService.sendVerificationOTP(user, verificationType);
        }
        // Sends the OTP via email if the verification type is EMAIL
        if (verificationType.equals(VerificationType.EMAIL)) {
            emailService.sendVerificationOtpEmail(user.getEmail(), verificationCode.getOtp());
        }
        // Returns a success message
        return ResponseEntity.ok("Verification OTP sent successfully.");
    }
}
