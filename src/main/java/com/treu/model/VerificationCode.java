package com.treu.model;

// Custom enum or class for defining verification types (e.g., EMAIL, SMS)
import com.treu.domain.VerificationType;
// JPA annotations for database mapping and entity management
import jakarta.persistence.*;
// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;

// Marks this class as a JPA entity to be mapped to a database table
@Entity
// Automatically generates getters, setters, and other utility methods
@Data
public class VerificationCode {

    // Primary key field, auto-incremented by the database using the default strategy
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // One-time password (OTP) for verification
    private String otp;

    // One-to-one relationship with User entity, linking the verification code to a specific user
    @OneToOne
    private User user;

    // Email address associated with the verification, if applicable
    private String email;

    // Mobile phone number associated with the verification, if applicable
    private String mobile;

    // Type of verification (e.g., EMAIL, SMS) used for this code
    private VerificationType verificationType;
}
