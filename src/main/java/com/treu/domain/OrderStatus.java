package com.treu.domain;

// Defines an enumeration for the possible statuses of an order
public enum OrderStatus {
    // Order has been created but not yet processed or completed
    PENDING,

    // Order has been fully executed (e.g., fully bought or sold)
    FILLED,

    // Order has been cancelled before completion
    CANCELLED,

    // Order has been partially executed, with some quantity remaining
    PARTIALLY_FILLED,

    // Order encountered an error during processing
    ERROR,

    // Order was successfully completed (may overlap with FILLED, depending on context)
    SUCCESS
}