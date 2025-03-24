package com.treu.model;

// Jackson annotation to customize JSON property mapping and access
import com.fasterxml.jackson.annotation.JsonProperty;
// JPA annotation to mark this class as an entity for database mapping
import jakarta.persistence.*;
// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;

// Marks this class as a JPA entity to be mapped to a database table
@Entity
// Automatically generates getters, setters, and other utility methods
@Data
public class PaymentDetails {

    // Primary key field, auto-incremented by the database using the default strategy
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // Bank account number for payment processing
    private String accountNumber;

    // Name of the account holder
    private String accountHolderName;

    // IFSC code for identifying the bank branch (commonly used in India)
    private String ifsc;

    // Name of the bank
    private String bankName;

    // One-to-one relationship with User entity, write-only in JSON (not included in output)
    @OneToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)  // Allows setting via JSON but hides in serialization
    private User user;
}
