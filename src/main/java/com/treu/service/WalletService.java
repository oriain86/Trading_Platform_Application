package com.treu.service;

// Custom exception for wallet-related errors
import com.treu.exception.WalletException;
// Entity class representing an order
import com.treu.model.Order;
// Entity class representing a user
import com.treu.model.User;
// Entity class representing a wallet
import com.treu.model.Wallet;

// Defines a service interface for managing wallet-related operations
public interface WalletService {

    // Retrieves the wallet associated with a specific user, throws WalletException on error
    Wallet getUserWallet(User user) throws WalletException;

    // Adds a specified amount of money to a wallet, throws WalletException on error
    public Wallet addBalanceToWallet(Wallet wallet, Long money) throws WalletException;

    // Finds a wallet by its ID, throws WalletException if not found or error occurs
    public Wallet findWalletById(Long id) throws WalletException;

    // Transfers an amount from a sender's wallet to a receiver's wallet, throws WalletException on error
    public Wallet walletToWalletTransfer(User sender, Wallet receiverWallet, Long amount) throws WalletException;

    // Processes payment for an order using a user's wallet, throws WalletException on error
    public Wallet payOrderPayment(Order order, User user) throws WalletException;
}
