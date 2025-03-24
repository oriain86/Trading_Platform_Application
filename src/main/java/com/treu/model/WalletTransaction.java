package com.treu.model;

// Custom enum for defining types of wallet transactions (e.g., DEPOSIT, WITHDRAWAL)
import com.treu.domain.WalletTransactionType;
// JPA annotations for database mapping and entity management
import jakarta.persistence.*;
// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;

import java.time.LocalDate;           // Date class for storing transaction dates without time

// Marks this class as a JPA entity to be mapped to a database table
@Entity
// Automatically generates getters, setters, and other utility methods
@Data
public class WalletTransaction {

    // Primary key field, auto-incremented by the database using the default strategy
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // Many-to-one relationship with Wallet entity, linking the transaction to a specific wallet
    @ManyToOne
    private Wallet wallet;

    // Type of transaction (e.g., DEPOSIT, WITHDRAWAL) defined by the WalletTransactionType enum
    private WalletTransactionType type;

    // Date of the transaction
    private LocalDate date;

    // Unique identifier for the transfer, if applicable
    private String transferId;

    // Description or reason for the transaction
    private String purpose;

    // Amount of the transaction
    private Long amount;
}
