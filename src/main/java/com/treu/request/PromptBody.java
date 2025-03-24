package com.treu.request;

// Lombok annotation to generate getters, setters, toString, equals, and hashCode
import lombok.Data;

// Automatically generates getters, setters, and other utility methods
@Data
public class PromptBody {
    // The prompt text provided in the request
    private String prompt;
}
