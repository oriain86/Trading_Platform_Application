package com.treu.response;

// Lombok annotation to generate a constructor with all fields
import lombok.AllArgsConstructor;
// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;
// Lombok annotation to generate a no-args constructor
import lombok.NoArgsConstructor;

// Automatically generates getters, setters, and other utility methods
@Data
// Generates a default constructor with no parameters
@NoArgsConstructor
// Generates a constructor with all fields as parameters
@AllArgsConstructor
public class AuthResponse {

    // JSON Web Token (JWT) for authenticated user session
    private String jwt;

    // Boolean indicating the success or failure of the authentication
    private boolean status;

    // Message providing details about the authentication result
    private String message;

    // Indicates whether two-factor authentication is enabled, defaults to false
    private boolean isTwoFactorAuthEnabled = false;

    // Session identifier for the authenticated session
    private String session;
}
