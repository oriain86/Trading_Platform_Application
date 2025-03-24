package com.treu.model;

// JPA annotations for database mapping and entity management
import jakarta.persistence.*;
// Lombok annotation to generate a constructor with all fields
import lombok.AllArgsConstructor;
// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;
// Lombok annotation to generate a no-args constructor
import lombok.NoArgsConstructor;

import java.math.BigDecimal;         // High-precision decimal class for financial calculations

// Marks this class as a JPA entity to be mapped to a database table
@Entity
// Specifies the table name in the database as "wallets"
@Table(name = "wallets")
// Automatically generates getters, setters, and other utility methods
@Data
// Generates a constructor with all fields as parameters
@AllArgsConstructor
// Generates a default constructor with no parameters
@NoArgsConstructor
public class Wallet {

    // Primary key field, auto-incremented by the database
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // One-to-one relationship with User entity, linking the wallet to a specific user
    @OneToOne
    private User user;

    // Current balance in the wallet, using BigDecimal for precision, defaults to zero
    private BigDecimal balance = BigDecimal.ZERO;
}
