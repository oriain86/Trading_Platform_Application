package com.treu.model;

// Jackson annotation to customize JSON property mapping and access
import com.fasterxml.jackson.annotation.JsonProperty;
// JPA annotations for database mapping and entity management
import jakarta.persistence.*;
// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;

// Automatically generates getters, setters, and other utility methods
@Data
// Marks this class as a JPA entity to be mapped to a database table
@Entity
public class TwoFactorOTP {
    // Primary key field for the two-factor OTP record
    @Id
    private String id;

    // One-time password (OTP) for two-factor authentication
    private String otp;

    // One-to-one relationship with User entity, write-only in JSON (not included in output)
    @OneToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)  // Allows setting via JSON but hides in serialization
    private User user;

    // JSON Web Token (JWT) associated with the OTP, write-only in JSON (not included in output)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)  // Allows setting via JSON but hides in serialization
    private String jwt;
}
