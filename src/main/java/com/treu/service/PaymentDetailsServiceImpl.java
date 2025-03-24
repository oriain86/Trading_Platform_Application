package com.treu.service;

// Entity class representing payment details
import com.treu.model.PaymentDetails;
// Entity class representing a user
import com.treu.model.User;
// Repository interface for payment details data access
import com.treu.repository.PaymentDetailsRepository;
// Spring annotation for dependency injection
import org.springframework.beans.factory.annotation.Autowired;
// Spring annotation to mark this class as a service
import org.springframework.stereotype.Service;

// Marks this class as a Spring service bean
@Service
public class PaymentDetailsServiceImpl implements PaymentDetailsService {

    // Repository for performing CRUD operations on PaymentDetails entities
    @Autowired
    private PaymentDetailsRepository paymentDetailsRepository;

    // Adds new payment details for a user and saves it to the database
    @Override
    public PaymentDetails addPaymentDetails(String accountNumber,
                                            String accountHolderName,
                                            String ifsc,
                                            String bankName,
                                            User user) {
        PaymentDetails paymentDetails = new PaymentDetails(); // Creates a new PaymentDetails instance
        paymentDetails.setAccountNumber(accountNumber);       // Sets the account number
        paymentDetails.setAccountHolderName(accountHolderName); // Sets the account holder's name
        paymentDetails.setIfsc(ifsc);                         // Sets the IFSC code
        paymentDetails.setBankName(bankName);                 // Sets the bank name
        paymentDetails.setUser(user);                         // Associates the payment details with the user
        // Saves and returns the payment details entity
        return paymentDetailsRepository.save(paymentDetails);
    }

    // Retrieves payment details for a specific user by their ID
    @Override
    public PaymentDetails getUsersPaymentDetails(User user) {
        // Queries the repository using the user's ID to fetch payment details
        return paymentDetailsRepository.getPaymentDetailsByUserId(user.getId());
    }
}
