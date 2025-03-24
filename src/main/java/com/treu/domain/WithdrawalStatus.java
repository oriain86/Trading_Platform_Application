package com.treu.domain;

// Defines an enumeration for the possible statuses of a withdrawal request
public enum WithdrawalStatus {
    // Indicates that the withdrawal request has been submitted but not yet processed
    PENDING,

    // Indicates that the withdrawal request has been successfully completed
    SUCCESS,

    // Indicates that the withdrawal request has been rejected or declined
    DECLINE
}
