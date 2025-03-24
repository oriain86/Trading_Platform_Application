package com.treu.model;

// JPA annotations for database mapping and entity management
import jakarta.persistence.*;
// Lombok annotation to generate a constructor with all fields
import lombok.AllArgsConstructor;
// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;
// Lombok annotation to generate a no-args constructor
import lombok.NoArgsConstructor;

import java.util.ArrayList;          // Dynamic array implementation for storing lists
import java.util.List;             // Interface for ordered collections

// Marks this class as a JPA entity to be mapped to a database table
@Entity
// Automatically generates getters, setters, and other utility methods
@Data
// Generates a default constructor with no parameters
@NoArgsConstructor
// Generates a constructor with all fields as parameters
@AllArgsConstructor
public class Watchlist {

    // Primary key field, auto-incremented by the database using the default strategy
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // One-to-one relationship with User entity, linking the watchlist to a specific user
    @OneToOne
    private User user;

    // Many-to-many relationship with Coin entity, storing a list of watched coins, initialized as an empty ArrayList
    @ManyToMany
    private List<Coin> coins = new ArrayList<>();
}
