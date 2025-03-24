package com.treu.model;

// Custom enum or class for verification types, likely defining methods like email or phone
import com.treu.domain.VerificationType;
// JPA annotation to mark this class as an entity for database mapping
import jakarta.persistence.Entity;
// JPA annotation to mark the primary key field
import jakarta.persistence.Id;
// JPA annotation to define a one-to-one relationship with another entity
import jakarta.persistence.OneToOne;
// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;

// Marks this class as a JPA entity to be mapped to a database table
@Entity
// Automatically generates getters, setters, and other utility methods
@Data
public class ForgotPasswordToken {
    // Primary key field for the forgot password token
    @Id
    private String id;

    // One-to-one relationship with the User entity, linking the token to a specific user
    @OneToOne
    private User user;

    // One-time password (OTP) for verification
    private String otp;

    // Type of verification (e.g., email, SMS), using the VerificationType enum/class
    private VerificationType verificationType;

    // Destination where the OTP was sent (e.g., email address or phone number)
    private String sendTo;

    // Email address associated with the verification, if applicable
    private String email;
}
