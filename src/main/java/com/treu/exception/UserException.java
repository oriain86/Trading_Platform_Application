package com.treu.exception;

// Custom exception class for user-related errors, inheriting from Exception
public class UserException extends Exception {

    // Constructor that accepts an error message
    public UserException(String message) {
        super(message);             // Passes the provided message to the parent Exception class
    }
}
