package com.treu.request;

// Custom enum for defining order types (e.g., BUY, SELL)
import com.treu.domain.OrderType;
// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;

// Automatically generates getters, setters, and other utility methods
@Data
public class CreateOrderRequest {
    // Identifier of the coin involved in the order
    private String coinId;

    // Quantity of the coin to be ordered
    private double quantity;

    // Type of the order (e.g., BUY, SELL) defined by the OrderType enum
    private OrderType orderType;
}
