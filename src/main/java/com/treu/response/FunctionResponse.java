package com.treu.response;

// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;

// Automatically generates getters, setters, and other utility methods
@Data
public class FunctionResponse {
    // Name of the function being executed or referenced
    private String functionName;

    // Name of the currency involved in the response
    private String currencyName;

    // Data related to the currency, possibly in a string format (e.g., JSON, value)
    private String currencyData;
}
