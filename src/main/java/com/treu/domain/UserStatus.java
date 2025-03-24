package com.treu.domain;

// Defines an enumeration for the verification status of a user in the application
public enum UserStatus {
    // Indicates that the user has been fully verified (e.g., email or OTP confirmation completed)
    VERIFIED,

    // Indicates that the user is registered but not yet verified (e.g., awaiting confirmation)
    PENDING
}