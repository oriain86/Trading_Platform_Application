package com.treu.model;

// Custom enum for defining available payment methods (e.g., CARD, BANK_TRANSFER)
import com.treu.domain.PaymentMethod;
// Custom enum for payment order statuses (e.g., PENDING, COMPLETED)
import com.treu.domain.PaymentOrderStatus;
// JPA annotation to mark this class as an entity for database mapping
import jakarta.persistence.*;
// Lombok annotation to generate a constructor with all fields
import lombok.AllArgsConstructor;
// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;
// Lombok annotation to generate a no-args constructor
import lombok.NoArgsConstructor;

// Marks this class as a JPA entity to be mapped to a database table
@Entity
// Generates a constructor with all fields as parameters
@AllArgsConstructor
// Generates a default constructor with no parameters
@NoArgsConstructor
// Automatically generates getters, setters, and other utility methods
@Data
public class PaymentOrder {

    // Primary key field, auto-incremented by the database using the default strategy
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // Amount of the payment order
    private Long amount;

    // Status of the payment order (e.g., PENDING, COMPLETED), defaults to PENDING
    private PaymentOrderStatus status = PaymentOrderStatus.PENDING;

    // Method used for the payment (e.g., CARD, BANK_TRANSFER)
    private PaymentMethod paymentMethod;

    // Many-to-one relationship with User entity, linking the payment order to a user
    @ManyToOne
    private User user;
}
