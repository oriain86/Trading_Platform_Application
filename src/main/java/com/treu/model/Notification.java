package com.treu.model;

// Lombok annotation to generate a constructor with all fields
import lombok.AllArgsConstructor;
// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;
// Lombok annotation to generate a no-args constructor
import lombok.NoArgsConstructor;

// Automatically generates getters, setters, and other utility methods
@Data
// Generates a default constructor with no parameters
@NoArgsConstructor
// Generates a constructor with all fields as parameters
@AllArgsConstructor
public class Notification {
    // Identifier of the user sending the notification
    private Long fromUserId;

    // Identifier of the user receiving the notification
    private Long toUserid;

    // Amount associated with the notification (e.g., transaction value)
    private Long amount;

    // Message content of the notification
    private String message;
}
