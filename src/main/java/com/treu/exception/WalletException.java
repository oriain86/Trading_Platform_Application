package com.treu.exception;

// Custom exception class for wallet-related errors, extending the base Exception class
public class WalletException extends Exception {

    // Constructor that takes a message parameter for error details
    public WalletException(String message) {
        super(message);             // Forwards the message to the parent Exception class constructor
    }
}
