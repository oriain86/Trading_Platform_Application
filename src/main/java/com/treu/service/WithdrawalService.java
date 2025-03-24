package com.treu.service;

// Entity class representing a user
import com.treu.model.User;
// Entity class representing a withdrawal
import com.treu.model.Withdrawal;

import java.util.List;             // Interface for ordered collections

// Defines a service interface for managing withdrawal-related operations
public interface WithdrawalService {

    // Requests a new withdrawal for a specified amount by a user
    Withdrawal requestWithdrawal(Long amount, User user);

    // Processes a withdrawal request (approve or reject), throws an exception if error occurs
    Withdrawal procedWithdrawal(Long withdrawalId, boolean accept) throws Exception;

    // Retrieves a user's withdrawal history
    List<Withdrawal> getUsersWithdrawalHistory(User user);

    // Fetches all pending withdrawal requests across all users
    List<Withdrawal> getAllWithdrawalRequest();
}
