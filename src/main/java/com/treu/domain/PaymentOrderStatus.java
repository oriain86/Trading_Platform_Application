package com.treu.domain;

// Defines an enumeration for the possible statuses of a payment order
public enum PaymentOrderStatus {
    // Indicates that the payment order has been created but not yet processed
    PENDING,

    // Indicates that the payment order has been successfully completed
    SUCCESS,

    // Indicates that the payment order has failed (e.g., due to insufficient funds or payment gateway error)
    FAILED
}