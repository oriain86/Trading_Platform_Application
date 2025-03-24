package com.treu.controller;

import com.treu.domain.WalletTransactionType;
import com.treu.model.*;
import com.treu.response.PaymentResponse;
import com.treu.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Marks this class as a REST controller, handling wallet-related requests
@RestController
public class WalletController {

    @Autowired private WalletService walleteService;          // Service for wallet operations (typo: should be walletService)
    @Autowired private UserService userService;              // Service for user operations
    @Autowired private OrderService orderService;            // Service for order operations
    @Autowired private WalletTransactionService walletTransactionService; // Service for wallet transaction operations
    @Autowired private PaymentService paymentService;        // Service for payment operations

    // Handles GET requests to retrieve the user's wallet
    @GetMapping("/api/wallet")
    public ResponseEntity<?> getUserWallet(@RequestHeader("Authorization") String jwt) throws Exception {
        // Retrieves the user associated with the JWT
        User user = userService.findUserProfileByJwt(jwt);
        // Fetches the user's wallet
        Wallet wallet = walleteService.getUserWallet(user);
        // Returns the wallet with HTTP 200 (OK)
        return new ResponseEntity<>(wallet, HttpStatus.OK);
    }

    // Handles GET requests to retrieve the user's wallet transactions
    @GetMapping("/api/wallet/transactions")
    public ResponseEntity<List<WalletTransaction>> getWalletTransaction(
            @RequestHeader("Authorization") String jwt) throws Exception {
        // Retrieves the user associated with the JWT
        User user = userService.findUserProfileByJwt(jwt);
        // Fetches the user's wallet
        Wallet wallet = walleteService.getUserWallet(user);
        // Retrieves transactions for the wallet (no filter applied)
        List<WalletTransaction> transactions = walletTransactionService.getTransactions(wallet, null);
        // Returns the transaction list with HTTP 200 (OK)
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    // Handles PUT requests to deposit money into the wallet (mock implementation)
    @PutMapping("/api/wallet/deposit/amount/{amount}")
    public ResponseEntity<PaymentResponse> depositMoney(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long amount                    // Amount to deposit from the URL
    ) throws Exception {
        // Retrieves the user and their wallet
        User user = userService.findUserProfileByJwt(jwt);
        Wallet wallet = walleteService.getUserWallet(user);
        // Creates a mock payment response (no actual payment processing)
        PaymentResponse res = new PaymentResponse();
        res.setPayment_url("deposite success"); // Typo: should be "deposit success"
        // Adds the amount to the wallet balance
        walleteService.addBalanceToWallet(wallet, amount);
        // Returns the mock response with HTTP 200 (OK)
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // Handles PUT requests to deposit money into the wallet using a payment order
    @PutMapping("/api/wallet/deposit")
    public ResponseEntity<Wallet> addMoneyToWallet(
            @RequestHeader("Authorization") String jwt,
            @RequestParam(name = "order_id") Long orderId,    // Payment order ID
            @RequestParam(name = "payment_id") String paymentId // Payment ID from payment provider
    ) throws Exception {
        // Retrieves the user and their wallet
        User user = userService.findUserProfileByJwt(jwt);
        Wallet wallet = walleteService.getUserWallet(user);
        // Fetches the payment order by ID
        PaymentOrder order = paymentService.getPaymentOrderById(orderId);
        // Processes the payment order with the payment ID
        Boolean status = paymentService.ProccedPaymentOrder(order, paymentId); // Typo: should be "ProceedPaymentOrder"
        // Creates a mock payment response
        PaymentResponse res = new PaymentResponse();
        res.setPayment_url("deposite success"); // Typo: should be "deposit success"
        // Adds the amount to the wallet if payment is successful
        if (status) {
            wallet = walleteService.addBalanceToWallet(wallet, order.getAmount());
        }
        // Returns the updated wallet with HTTP 200 (OK)
        return new ResponseEntity<>(wallet, HttpStatus.OK);
    }

    // Commented-out endpoint for withdrawing money (incomplete)
//    @PutMapping("/api/wallet/withdraw/amount/{amount}/user/{userId}")
//    public ResponseEntity<PaymentResponse> withdrawMoney(@PathVariable Long userId, @PathVariable Long amount) throws Exception {
//        String wallet = walleteService.depositFunds(userId, amount); // Likely a mistake; should be withdrawFunds
//        return new ResponseEntity<>(wallet, HttpStatus.OK);
//    }

    // Handles PUT requests to transfer money between wallets
    @PutMapping("/api/wallet/{walletId}/transfer")
    public ResponseEntity<Wallet> walletToWalletTransfer(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long walletId,                 // Recipient wallet ID
            @RequestBody WalletTransaction req           // Transaction details (amount, purpose)
    ) throws Exception {
        // Retrieves the sender user and recipient wallet
        User senderUser = userService.findUserProfileByJwt(jwt);
        Wallet reciverWallet = walleteService.findWalletById(walletId); // Typo: should be "receiverWallet"
        // Performs the wallet-to-wallet transfer
        Wallet wallet = walleteService.walletToWalletTransfer(senderUser, reciverWallet, req.getAmount());
        // Creates a transaction record for the transfer
        WalletTransaction walletTransaction = walletTransactionService.createTransaction(
                wallet,
                WalletTransactionType.WALLET_TRANSFER,
                reciverWallet.getId().toString(),
                req.getPurpose(),
                -req.getAmount()                     // Negative amount indicates a debit
        );
        // Returns the sender's updated wallet with HTTP 200 (OK)
        return new ResponseEntity<>(wallet, HttpStatus.OK);
    }

    // Handles PUT requests to pay for an order using wallet funds
    @PutMapping("/api/wallet/order/{orderId}/pay")
    public ResponseEntity<Wallet> payOrderPayment(
            @PathVariable Long orderId,                  // Order ID from the URL
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        // Retrieves the user and the order
        User user = userService.findUserProfileByJwt(jwt);
        System.out.println("-------- " + orderId); // Debug logging (consider a logging framework)
        Order order = orderService.getOrderById(orderId);
        // Processes the payment from the wallet
        Wallet wallet = walleteService.payOrderPayment(order, user);
        // Returns the updated wallet with HTTP 200 (OK)
        return new ResponseEntity<>(wallet, HttpStatus.OK);
    }
}
