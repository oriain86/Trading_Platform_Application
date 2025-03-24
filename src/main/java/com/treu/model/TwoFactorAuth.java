package com.treu.model;

// Custom enum or class for defining verification types (e.g., EMAIL, SMS)
import com.treu.domain.VerificationType;
// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;

// Automatically generates getters, setters, and other utility methods
@Data
public class TwoFactorAuth {

    // Indicates whether two-factor authentication is enabled, defaults to false
    private boolean isEnabled = false;

    // Specifies where the verification code should be sent (e.g., email or phone)
    private VerificationType sendTo;
}
