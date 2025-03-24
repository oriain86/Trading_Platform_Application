package com.treu.request;

// Custom enum or class for defining verification types (e.g., EMAIL, SMS)
import com.treu.domain.VerificationType;
// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;

// Automatically generates getters, setters, and other utility methods
@Data
public class UpdatePasswordRequest {
    // Destination where the verification code should be sent (e.g., email address or phone number)
    private String sendTo;

    // Type of verification method to use (e.g., EMAIL, SMS)
    private VerificationType verificationType;
}
