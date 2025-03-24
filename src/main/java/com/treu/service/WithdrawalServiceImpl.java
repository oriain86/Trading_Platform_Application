package com.treu.service;

// Custom enum for defining withdrawal statuses (e.g., PENDING, SUCCESS, DECLINE)
import com.treu.domain.WithdrawalStatus;
// Entity class representing a user
import com.treu.model.User;
// Entity class representing a withdrawal
import com.treu.model.Withdrawal;
// Repository interface for withdrawal data access
import com.treu.repository.WithdrawalRepository;
// Spring annotation for dependency injection
import org.springframework.beans.factory.annotation.Autowired;
// Spring annotation to mark this class as a service
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;   // Date and time class for withdrawal timestamps
import java.util.List;           // Interface for ordered collections
import java.util.Optional;       // Wrapper for handling nullable values

// Marks this class as a Spring service bean
@Service
public class WithdrawalServiceImpl implements WithdrawalService {

    // Repository for performing CRUD operations on Withdrawal entities
    @Autowired
    private WithdrawalRepository withdrawalRepository;

    // Requests a new withdrawal with a specified amount for a user
    @Override
    public Withdrawal requestWithdrawal(Long amount, User user) {
        Withdrawal withdrawal = new Withdrawal();      // Creates a new Withdrawal instance
        withdrawal.setAmount(amount);                  // Sets the withdrawal amount
        withdrawal.setStatus(WithdrawalStatus.PENDING); // Sets initial status to PENDING
        withdrawal.setDate(LocalDateTime.now());       // Sets the current date and time
        withdrawal.setUser(user);                      // Associates the withdrawal with the user
        return withdrawalRepository.save(withdrawal);  // Saves and returns the withdrawal
    }

    // Processes a withdrawal request, approving or rejecting it
    @Override
    public Withdrawal procedWithdrawal(Long withdrawalId, boolean accept) throws Exception { // Note: "proced" typo
        // Queries the repository for the withdrawal by ID
        Optional<Withdrawal> withdrawalOptional = withdrawalRepository.findById(withdrawalId);

        // Throws exception if withdrawal is not found
        if (withdrawalOptional.isEmpty()) {
            throw new Exception("withdrawal id is wrong...");
        }

        Withdrawal withdrawal = withdrawalOptional.get(); // Retrieves the withdrawal

        withdrawal.setDate(LocalDateTime.now());          // Updates the date to current time

        // Sets status based on acceptance
        if (accept) {
            withdrawal.setStatus(WithdrawalStatus.SUCCESS); // Approves the withdrawal
        } else {
            withdrawal.setStatus(WithdrawalStatus.DECLINE); // Rejects the withdrawal
        }

        return withdrawalRepository.save(withdrawal);     // Saves and returns the updated withdrawal
    }

    // Retrieves a user's withdrawal history
    @Override
    public List<Withdrawal> getUsersWithdrawalHistory(User user) {
        // Fetches all withdrawals for the user by their ID
        return withdrawalRepository.findByUserId(user.getId());
    }

    // Fetches all withdrawal requests across all users
    @Override
    public List<Withdrawal> getAllWithdrawalRequest() {
        // Retrieves all withdrawals from the repository
        return withdrawalRepository.findAll();
    }
}
