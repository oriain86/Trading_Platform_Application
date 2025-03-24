package com.treu.controller;

import com.treu.domain.WalletTransactionType;
import com.treu.model.User;
import com.treu.model.Wallet;
import com.treu.model.WalletTransaction;
import com.treu.model.Withdrawal;
import com.treu.service.UserService;
import com.treu.service.WalletService;
import com.treu.service.WalletTransactionService;
import com.treu.service.WithdrawalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Marks this class as a REST controller, handling withdrawal-related requests
@RestController
public class WithdrawalController {

    @Autowired private WithdrawalService withdrawalService;        // Service for withdrawal operations
    @Autowired private WalletService walletService;                // Service for wallet operations
    @Autowired private UserService userService;                    // Service for user operations
    @Autowired private WalletTransactionService walletTransactionService; // Service for wallet transaction operations

    // Handles POST requests to initiate a withdrawal request
    @PostMapping("/api/withdrawal/{amount}")
    public ResponseEntity<?> withdrawalRequest(
            @PathVariable Long amount,                         // Withdrawal amount from the URL
            @RequestHeader("Authorization") String jwt         // JWT from the Authorization header
    ) throws Exception {
        // Retrieves the user associated with the JWT
        User user = userService.findUserProfileByJwt(jwt);
        // Fetches the user's wallet
        Wallet userWallet = walletService.getUserWallet(user);
        // Requests a withdrawal for the specified amount
        Withdrawal withdrawal = withdrawalService.requestWithdrawal(amount, user);
        // Deducts the withdrawal amount from the wallet (negative value)
        walletService.addBalanceToWallet(userWallet, -withdrawal.getAmount());
        // Creates a transaction record for the withdrawal
        WalletTransaction walletTransaction = walletTransactionService.createTransaction(
                userWallet,
                WalletTransactionType.WITHDRAWAL,
                null,                                      // No specific reference ID
                "bank account withdrawal",                 // Transaction purpose
                withdrawal.getAmount()                     // Positive amount for the record
        );
        // Returns the withdrawal details with HTTP 200 (OK)
        return new ResponseEntity<>(withdrawal, HttpStatus.OK);
    }

    // Handles PATCH requests to approve or reject a withdrawal (admin endpoint)
    @PatchMapping("/api/admin/withdrawal/{id}/proceed/{accept}")
    public ResponseEntity<?> proceedWithdrawal(
            @PathVariable Long id,                             // Withdrawal ID from the URL
            @PathVariable boolean accept,                      // Approval status (true = accept, false = reject)
            @RequestHeader("Authorization") String jwt         // JWT from the Authorization header
    ) throws Exception {
        // Retrieves the user (likely an admin) associated with the JWT
        User user = userService.findUserProfileByJwt(jwt);
        // Processes the withdrawal (approve/reject)
        Withdrawal withdrawal = withdrawalService.procedWithdrawal(id, accept); // Typo: should be "proceedWithdrawal"
        // Fetches the user's wallet
        Wallet userWallet = walletService.getUserWallet(user);
        // If rejected, refunds the amount back to the wallet
        if (!accept) {
            walletService.addBalanceToWallet(userWallet, withdrawal.getAmount());
        }
        // Returns the updated withdrawal details with HTTP 200 (OK)
        return new ResponseEntity<>(withdrawal, HttpStatus.OK);
    }

    // Handles GET requests to retrieve the user's withdrawal history
    @GetMapping("/api/withdrawal")
    public ResponseEntity<List<Withdrawal>> getWithdrawalHistory(
            @RequestHeader("Authorization") String jwt         // JWT from the Authorization header
    ) throws Exception {
        // Retrieves the user associated with the JWT
        User user = userService.findUserProfileByJwt(jwt);
        // Fetches the user's withdrawal history
        List<Withdrawal> withdrawal = withdrawalService.getUsersWithdrawalHistory(user);
        // Returns the withdrawal history with HTTP 200 (OK)
        return new ResponseEntity<>(withdrawal, HttpStatus.OK);
    }

    // Handles GET requests to retrieve all withdrawal requests (admin endpoint)
    @GetMapping("/api/admin/withdrawal")
    public ResponseEntity<List<Withdrawal>> getAllWithdrawalRequest(
            @RequestHeader("Authorization") String jwt         // JWT from the Authorization header
    ) throws Exception {
        // Retrieves the user (likely an admin) associated with the JWT
        User user = userService.findUserProfileByJwt(jwt);
        // Fetches all pending withdrawal requests
        List<Withdrawal> withdrawal = withdrawalService.getAllWithdrawalRequest();
        // Returns the list of withdrawal requests with HTTP 200 (OK)
        return new ResponseEntity<>(withdrawal, HttpStatus.OK);
    }
}
