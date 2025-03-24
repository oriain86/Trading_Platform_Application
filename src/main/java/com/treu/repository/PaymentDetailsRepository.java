package com.treu.repository;

// Entity class representing payment details in the system
import com.treu.model.PaymentDetails;
// Spring Data JPAs repository interface providing CRUD operations
import org.springframework.data.jpa.repository.JpaRepository;

// Defines a repository interface for PaymentDetails entity management
public interface PaymentDetailsRepository extends JpaRepository<PaymentDetails, Long> {

    // Retrieves payment details for a specific user by their user ID
    PaymentDetails getPaymentDetailsByUserId(Long userId);
}
