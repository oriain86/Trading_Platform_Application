package com.treu.model;

// Custom enum for defining possible order statuses (e.g., PENDING, COMPLETED)
import com.treu.domain.OrderStatus;
// Custom enum for defining order types (e.g., BUY, SELL)
import com.treu.domain.OrderType;
// JPA annotation to mark this class as an entity for database mapping
import jakarta.persistence.*;
// Lombok annotation to generate a constructor with all fields
import lombok.AllArgsConstructor;
// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;
// Lombok annotation to generate a no-args constructor
import lombok.NoArgsConstructor;

import java.math.BigDecimal;         // High-precision decimal class for financial calculations
import java.time.LocalDateTime;     // Date and time class for timestamp storage

// Automatically generates getters, setters, and other utility methods
@Data
// Generates a constructor with all fields as parameters
@AllArgsConstructor
// Generates a default constructor with no parameters
@NoArgsConstructor
// Marks this class as a JPA entity to be mapped to a database table
@Entity
// Specifies the table name in the database as "orders"
@Table(name = "orders")
public class Order {
    // Primary key field, auto-incremented by the database
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many-to-one relationship with User entity, linking the order to a user
    @ManyToOne
    private User user;

    // Type of order (e.g., BUY, SELL), stored as a string in the database
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)       // Ensures this field cannot be null in the database
    private OrderType orderType;

    // Price of the order, using BigDecimal for precise financial values
    @Column(nullable = false)       // Ensures this field cannot be null in the database
    private BigDecimal price;

    // Timestamp of when the order was created or updated
    @Column(nullable = false)       // Ensures this field cannot be null in the database
    private LocalDateTime timestamp;

    // Status of the order (e.g., PENDING, COMPLETED), stored as a string, defaults to PENDING
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)       // Ensures this field cannot be null in the database
    private OrderStatus status = OrderStatus.PENDING;

    // One-to-one relationship with OrderItem, where OrderItem owns the relationship
    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)  // Cascades all operations (e.g., delete) to OrderItem
    private OrderItem orderItem;
}
