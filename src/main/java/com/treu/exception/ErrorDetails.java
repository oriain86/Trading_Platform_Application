package com.treu.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

// A data class to encapsulate error information for exception handling
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorDetails {

    // The specific error code or type (e.g., "USER_NOT_FOUND")
    private String error;

    // A human-readable message describing the error (e.g., "User with given ID not found")
    private String message;

    // The timestamp when the error occurred
    private LocalDateTime timestamp;
}
