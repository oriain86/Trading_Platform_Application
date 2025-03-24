package com.treu.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

// Global exception handler for the application, applied to all controllers
@ControllerAdvice
public class GlobalExceptions {

    // Handles UserException specifically, returning a BAD_REQUEST response
    @ExceptionHandler(UserException.class)
    public ResponseEntity<ErrorDetails> userExceptionHandler(
            UserException ue,           // The UserException instance thrown
            WebRequest req              // Details about the web request
    ) {
        // Creates an ErrorDetails object with the exception message, request description, and timestamp
        ErrorDetails error = new ErrorDetails(
                ue.getMessage(),        // Error code or message from UserException
                req.getDescription(false), // Request details (e.g., URI), excluding sensitive info
                LocalDateTime.now()     // Current timestamp
        );
        // Returns the error details with HTTP 400 (Bad Request)
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    // Handles RuntimeException, returning a BAD_REQUEST response
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorDetails> handleRuntimeException(
            RuntimeException ex,        // The RuntimeException instance thrown
            WebRequest request          // Details about the web request
    ) {
        // Creates an ErrorDetails object with the exception message, request description, and timestamp
        ErrorDetails error = new ErrorDetails(
                ex.getMessage(),        // Error message from RuntimeException
                request.getDescription(false), // Request details (e.g., URI)
                LocalDateTime.now()     // Current timestamp
        );
        // Returns the error details with HTTP 400 (Bad Request)
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    // Handles all other uncaught exceptions, returning an INTERNAL_SERVER_ERROR response
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> handleOtherExceptions(
            Exception ex,               // The generic Exception instance thrown
            WebRequest request          // Details about the web request
    ) {
        // Creates an ErrorDetails object with the exception message, request description, and timestamp
        ErrorDetails error = new ErrorDetails(
                ex.getMessage(),        // Error message from the exception
                request.getDescription(false), // Request details (e.g., URI)
                LocalDateTime.now()     // Current timestamp
        );
        // Returns the error details with HTTP 500 (Internal Server Error)
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
