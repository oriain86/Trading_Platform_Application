package com.treu.service;

// Exception class for Razorpay payment processing errors
import com.razorpay.RazorpayException;
// Exception class for Stripe payment processing errors
import com.stripe.exception.StripeException;
// Custom enum for defining payment methods (e.g., RAZORPAY, STRIPE)
import com.treu.domain.PaymentMethod;
// Entity class representing a payment order
import com.treu.model.PaymentOrder;
// Entity class representing a user
import com.treu.model.User;
// Response object for payment link creation
import com.treu.response.PaymentResponse;

// Defines a service interface for managing payment-related operations
public interface PaymentService {

    // Creates a new payment order for a user with the specified amount and payment method
    PaymentOrder createOrder(User user, Long amount, PaymentMethod paymentMethod);

    // Retrieves a payment order by its ID, throws an exception if not found or operation fails
    PaymentOrder getPaymentOrderById(Long id) throws Exception;

    // Processes a payment order using a payment ID, returns success status, throws RazorpayException on error
    Boolean ProccedPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException;

    // Creates a Razorpay payment link for a user, amount, and order ID, throws RazorpayException on error
    PaymentResponse createRazorpayPaymentLink(User user, Long Amount, Long orderId) throws RazorpayException;

    // Creates a Stripe payment link for a user, amount, and order ID, throws StripeException on error
    PaymentResponse createStripePaymentLink(User user, Long Amount, Long orderId) throws StripeException;
}
