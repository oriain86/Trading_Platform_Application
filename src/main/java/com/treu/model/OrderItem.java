package com.treu.model;

// Jackson annotation to exclude fields from JSON serialization
import com.fasterxml.jackson.annotation.JsonIgnore;
// JPA annotation to mark this class as an entity for database mapping
import jakarta.persistence.*;
// Lombok annotation to generate a constructor with all fields
import lombok.AllArgsConstructor;
// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;
// Lombok annotation to generate a no-args constructor
import lombok.NoArgsConstructor;

// Automatically generates getters, setters, and other utility methods
@Data
// Generates a constructor with all fields as parameters
@AllArgsConstructor
// Generates a default constructor with no parameters
@NoArgsConstructor
// Marks this class as a JPA entity to be mapped to a database table
@Entity
public class OrderItem {

    // Primary key field, auto-incremented by the database using the default strategy
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // Quantity of the asset in this order item
    private double quantity;

    // Many-to-one relationship with Coin entity, linking this item to a specific cryptocurrency
    @ManyToOne
    private Coin coin;

    // Purchase price of the asset for this order item
    private double buyPrice;

    // Selling price of the asset for this order item
    private double sellPrice;

    // One-to-one relationship with Order entity, excluded from JSON serialization
    @JsonIgnore
    @OneToOne
    private Order order;
}
