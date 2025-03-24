package com.treu.model;

// Jackson annotation to customize JSON property mapping and access
import com.fasterxml.jackson.annotation.JsonProperty;
// Custom enum for defining user roles (e.g., ROLE_USER, ROLE_ADMIN)
import com.treu.domain.USER_ROLE;
// Custom enum for user status (e.g., PENDING, ACTIVE)
import com.treu.domain.UserStatus;
// JPA annotations for database mapping and entity management
import jakarta.persistence.*;
// Lombok annotation to generate a constructor with all fields
import lombok.AllArgsConstructor;
// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;
// Lombok annotation to generate a no-args constructor
import lombok.NoArgsConstructor;

// Marks this class as a JPA entity to be mapped to a database table
@Entity
// Automatically generates getters, setters, and other utility methods
@Data
// Generates a default constructor with no parameters
@NoArgsConstructor
// Generates a constructor with all fields as parameters
@AllArgsConstructor
public class User {

    // Primary key field, auto-incremented by the database using the default strategy
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // Full name of the user
    private String fullName;

    // Email address of the user
    private String email;

    // Mobile phone number of the user
    private String mobile;

    // User's password, write-only in JSON (not included in output for security)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)  // Allows setting via JSON but hides in serialization
    private String password;

    // Status of the user (e.g., PENDING, ACTIVE), defaults to PENDING
    private UserStatus status = UserStatus.PENDING;

    // Indicates whether the user's account is verified, defaults to false
    private boolean isVerified = false;

    // Embedded TwoFactorAuth object, storing its fields directly in this table, defaults to a new instance
    @Embedded
    private TwoFactorAuth twoFactorAuth = new TwoFactorAuth();

    // URL or path to the user's profile picture
    private String picture;

    // Role of the user (e.g., ROLE_USER, ROLE_ADMIN), defaults to ROLE_USER
    private USER_ROLE role = USER_ROLE.ROLE_USER;
}
