package com.treu.model;

// Custom enum for defining withdrawal statuses (e.g., PENDING, COMPLETED)
import com.treu.domain.WithdrawalStatus;
// JPA annotations for database mapping and entity management
import jakarta.persistence.*;
// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;

import java.time.LocalDateTime;     // Date and time class for timestamp storage

// Marks this class as a JPA entity to be mapped to a database table
@Entity
// Automatically generates getters, setters, and other utility methods
@Data
public class Withdrawal {
    // Primary key field, auto-incremented by the database using the default strategy
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    // Status of the withdrawal (e.g., PENDING, COMPLETED)
    private WithdrawalStatus status;

    // Amount of the withdrawal
    private Long amount;

    // Many-to-one relationship with User entity, linking the withdrawal to a specific user
    @ManyToOne
    private User user;

    // Date and time when the withdrawal was requested or processed
    private LocalDateTime date;
}
