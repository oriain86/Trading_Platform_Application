package com.treu.model;

import jakarta.persistence.*;          // Imports JPA annotations for database mapping
import lombok.AllArgsConstructor;   // Lombok annotation for generating all-args constructor
import lombok.Data;                  // Lombok annotation for getters, setters, toString, etc.
import lombok.NoArgsConstructor;    // Lombok annotation for no-args constructor

// Marks this class as a JPA entity to be mapped to a database table
@Entity
@Data                               // Automatically generates getters, setters, equals, hashCode, and toString
@AllArgsConstructor                 // Generates a constructor with all fields as parameters
@NoArgsConstructor                  // Generates a default constructor with no parameters
public class Asset {

    // Primary key field, auto-incremented by the database
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Stores the amount of the asset owned
    private double quantity;

    // Records the price at which the asset was purchased
    private double buyPrice;

    // Many-to-one relationship with Coin entity, representing which cryptocurrency this asset is
    @ManyToOne
    private Coin coin;

    // Many-to-one relationship with User entity, indicating which user owns this asset
    @ManyToOne
    private User user;
}
