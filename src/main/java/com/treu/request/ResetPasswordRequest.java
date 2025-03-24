package com.treu.request;

// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;

// Automatically generates getters, setters, and other utility methods
@Data
public class ResetPasswordRequest {

    // New password to be set for the user
    private String password;

    // One-time password (OTP) for verifying the reset request
    private String otp;
}
