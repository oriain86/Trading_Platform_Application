package com.treu.response;

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
public class ApiResponse {

    // Message describing the result or details of the API response
    private String message;

    // Boolean indicating the success or failure status of the API operation
    private boolean status;
}
