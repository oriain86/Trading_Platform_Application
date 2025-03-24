package com.treu.model;

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
// Generates a constructor with all fields as parameters
@AllArgsConstructor
// Generates a default constructor with no parameters
@NoArgsConstructor
public class TradingHistory {

    // Primary key field, auto-incremented by the database using the default strategy
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // Price at which the asset was sold
    private double sellingPrice;

    // Price at which the asset was bought
    private double buyingPrice;

    // Embedded Coin object, storing its fields directly in this table
    @Embedded
    private Coin coin;

    // Many-to-one relationship with User entity, linking the trading history to a user
    @ManyToOne
    private User user;
}
