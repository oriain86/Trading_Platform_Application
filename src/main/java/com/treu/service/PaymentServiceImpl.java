package com.treu.service;

// Razorpay payment object
import com.razorpay.Payment;
// Razorpay payment link object
import com.razorpay.PaymentLink;
// Razorpay client for API interactions
import com.razorpay.RazorpayClient;
// Exception for Razorpay-specific errors
import com.razorpay.RazorpayException;
// Exception for Stripe-specific errors
import com.stripe.exception.StripeException;
// Stripe API main class
import com.stripe.Stripe;
// Stripe checkout session object
import com.stripe.model.checkout.Session;
// Parameters for creating Stripe checkout sessions
import com.stripe.param.checkout.SessionCreateParams;
// Custom enum for payment methods (e.g., RAZORPAY, STRIPE)
import com.treu.domain.PaymentMethod;
// Custom enum for payment order statuses (e.g., PENDING, SUCCESS)
import com.treu.domain.PaymentOrderStatus;
// Entity class for payment orders
import com.treu.model.PaymentOrder;
// Entity class for users
import com.treu.model.User;
// Repository for payment order data access
import com.treu.repository.PaymentOrderRepository;
// Response object for payment links
import com.treu.response.PaymentResponse;
// JSON object for constructing Razorpay requests
import org.json.JSONObject;
// Spring annotation for dependency injection
import org.springframework.beans.factory.annotation.Autowired;
// Spring annotation for injecting property values
import org.springframework.beans.factory.annotation.Value;
// Spring annotation to mark this class as a service
import org.springframework.stereotype.Service;

import java.util.Optional;        // Wrapper for handling nullable values

// Marks this class as a Spring service bean
@Service
public class PaymentServiceImpl implements PaymentService {

    // Stripe API secret key from application properties
    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    // Razorpay API key from application properties
    @Value("${razorpay.api.key}")
    private String apiKey;

    // Razorpay API secret from application properties
    @Value("${razorpay.api.secret}")
    private String apiSecret;

    // Repository for managing PaymentOrder entities
    @Autowired
    private PaymentOrderRepository paymentOrderRepository;

    // Creates a new payment order with user, amount, and method
    @Override
    public PaymentOrder createOrder(User user, Long amount, PaymentMethod paymentMethod) {
        PaymentOrder order = new PaymentOrder();    // Initializes a new PaymentOrder
        order.setUser(user);                        // Sets the associated user
        order.setAmount(amount);                    // Sets the payment amount
        order.setPaymentMethod(paymentMethod);      // Sets the payment method
        return paymentOrderRepository.save(order);  // Saves and returns the order
    }

    // Retrieves a payment order by ID, throws exception if not found
    @Override
    public PaymentOrder getPaymentOrderById(Long id) throws Exception {
        Optional<PaymentOrder> optionalPaymentOrder = paymentOrderRepository.findById(id); // Queries by ID
        if (optionalPaymentOrder.isEmpty()) {       // Checks if order exists
            throw new Exception("payment order not found with id " + id); // Throws if not found
        }
        return optionalPaymentOrder.get();          // Returns the found order
    }

    // Processes a payment order based on payment ID (Razorpay-specific logic)
    @Override
    public Boolean ProccedPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException {
        if (paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)) { // Checks if order is pending
            if (paymentOrder.getPaymentMethod().equals(PaymentMethod.RAZORPAY)) { // Razorpay-specific logic
                RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret); // Initializes Razorpay client
                Payment payment = razorpay.payments.fetch(paymentId); // Fetches payment details

                Integer amount = payment.get("amount");     // Gets payment amount
                String status = payment.get("status");      // Gets payment status
                if (status.equals("captured")) {            // Checks if payment was successful
                    paymentOrder.setStatus(PaymentOrderStatus.SUCCESS); // Updates to SUCCESS
                    paymentOrderRepository.save(paymentOrder); // Saves updated order
                    return true;                            // Returns success
                }
                paymentOrder.setStatus(PaymentOrderStatus.FAILED); // Sets to FAILED if not captured
                paymentOrderRepository.save(paymentOrder); // Saves updated order
                return false;                               // Returns failure
            }
            // Default case (non-Razorpay, e.g., Stripe not implemented here)
            paymentOrder.setStatus(PaymentOrderStatus.SUCCESS); // Assumes success
            paymentOrderRepository.save(paymentOrder);  // Saves updated order (duplicate save below)
            paymentOrderRepository.save(paymentOrder);  // Redundant save
            return true;                                // Returns success
        }
        return false;                                   // Returns false if not pending
    }

    // Creates a Razorpay payment link for a user and order
    @Override
    public PaymentResponse createRazorpayPaymentLink(User user, Long Amount, Long orderId) throws RazorpayException {
        Long amount = Amount * 100;                     // Converts amount to paise (Razorpay requires smallest unit)

        try {
            RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret); // Initializes Razorpay client

            JSONObject paymentLinkRequest = new JSONObject(); // JSON object for payment link request
            paymentLinkRequest.put("amount", amount);   // Sets amount in paise
            paymentLinkRequest.put("currency", "INR");  // Sets currency to INR

            // Customer details for the payment link
            JSONObject customer = new JSONObject();
            customer.put("name", user.getFullName());   // Sets user's full name
            customer.put("email", user.getEmail());     // Sets user's email
            paymentLinkRequest.put("customer", customer); // Adds customer to request

            // Notification settings
            JSONObject notify = new JSONObject();
            notify.put("email", true);                  // Enables email notification
            paymentLinkRequest.put("notify", notify);   // Adds notify to request

            paymentLinkRequest.put("reminder_enable", true); // Enables reminders

            // Callback settings for post-payment redirection
            paymentLinkRequest.put("callback_url", "http://localhost:5173/wallet/" + orderId);
            paymentLinkRequest.put("callback_method", "get");

            // Creates the payment link via Razorpay API
            PaymentLink payment = razorpay.paymentLink.create(paymentLinkRequest);

            String paymentLinkId = payment.get("id");   // Gets payment link ID
            String paymentLinkUrl = payment.get("short_url"); // Gets short URL

            PaymentResponse res = new PaymentResponse(); // Creates response object
            res.setPayment_url(paymentLinkUrl);         // Sets payment URL

            return res;                                 // Returns response with payment link

        } catch (RazorpayException e) {
            System.out.println("Error creating payment link: " + e.getMessage()); // Logs error
            throw new RazorpayException(e.getMessage()); // Rethrows exception
        }
    }

    // Creates a Stripe payment link for a user and order
    @Override
    public PaymentResponse createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException {
        Stripe.apiKey = stripeSecretKey;                // Sets Stripe API key

        // Builds parameters for Stripe checkout session
        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD) // Allows card payments
                .setMode(SessionCreateParams.Mode.PAYMENT) // Sets mode to payment
                .setSuccessUrl("http://localhost:5173/wallet?order_id=" + orderId) // Success redirect URL
                .setCancelUrl("http://localhost:5173/payment/cancel") // Cancel redirect URL
                .addLineItem(SessionCreateParams.LineItem.builder() // Adds line item for payment
                        .setQuantity(1L)                    // Sets quantity to 1
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder() // Price details
                                .setCurrency("usd")         // Sets currency to USD
                                .setUnitAmount(amount * 100) // Converts amount to cents
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName("Top up wallet") // Product name
                                        .build())
                                .build())
                        .build())
                .build();

        Session session = Session.create(params);       // Creates Stripe checkout session

        System.out.println("session _____ " + session); // Logs session for debugging

        PaymentResponse res = new PaymentResponse();    // Creates response object
        res.setPayment_url(session.getUrl());           // Sets payment URL from session

        return res;                                     // Returns response with payment link
    }
}
