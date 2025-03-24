package com.treu.service;

// Entity class representing payment details
import com.treu.model.PaymentDetails;
// Entity class representing a user
import com.treu.model.User;

// Defines a service interface for managing payment details
public interface PaymentDetailsService {
    // Adds new payment details for a user with the specified banking information
    public PaymentDetails addPaymentDetails(String accountNumber,
                                            String accountHolderName,
                                            String ifsc,
                                            String bankName,
                                            User user);

    // Retrieves the payment details associated with a specific user
    public PaymentDetails getUsersPaymentDetails(User user);
}
