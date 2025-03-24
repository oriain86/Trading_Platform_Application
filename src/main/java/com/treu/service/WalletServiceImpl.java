package com.treu.service;

// Custom enum for defining order types (e.g., BUY, SELL)
import com.treu.domain.OrderType;
// Custom exception for wallet-related errors
import com.treu.exception.WalletException;
// Entity class for orders
import com.treu.model.Order;
// Entity class for users
import com.treu.model.User;
// Entity class for wallets
import com.treu.model.Wallet;
// Entity class for wallet transactions
import com.treu.model.WalletTransaction;
// Repository interface for wallet data access
import com.treu.repository.WalletRepository;
// Repository interface for wallet transaction data access
import com.treu.repository.WalletTransactionRepository;
// Spring annotation for dependency injection
import org.springframework.beans.factory.annotation.Autowired;
// Spring annotation to mark this class as a service
import org.springframework.stereotype.Service;

import java.math.BigDecimal;      // High-precision decimal class for financial calculations
import java.time.LocalDate;       // Date class for transaction timestamps
import java.util.Optional;        // Wrapper for handling nullable values

// Marks this class as a Spring service bean
@Service
public class WalletServiceImpl implements WalletService {

    // Repository for managing Wallet entities
    @Autowired
    private WalletRepository walletRepository;

    // Repository for managing WalletTransaction entities
    @Autowired
    private WalletTransactionRepository walletTransactionRepository;

    // Generates a new wallet for a user and saves it
    public Wallet genrateWallete(User user) { // Note: "genrateWallete" seems to be a typo for "generateWallet"
        Wallet wallet = new Wallet();         // Creates a new Wallet instance
        wallet.setUser(user);                 // Associates the wallet with the user
        return walletRepository.save(wallet); // Saves and returns the wallet
    }

    // Retrieves or creates a user's wallet
    @Override
    public Wallet getUserWallet(User user) throws WalletException {
        // Queries for an existing wallet by user ID
        Wallet wallet = walletRepository.findByUserId(user.getId());
        if (wallet != null) {                 // Returns existing wallet if found
            return wallet;
        }

        wallet = genrateWallete(user);        // Creates a new wallet if none exists
        return wallet;                        // Returns the new wallet
    }

    // Finds a wallet by its ID, throws exception if not found
    @Override
    public Wallet findWalletById(Long id) throws WalletException {
        Optional<Wallet> wallet = walletRepository.findById(id); // Queries by ID
        if (wallet.isPresent()) {              // Returns wallet if found
            return wallet.get();
        }
        throw new WalletException("Wallet not found with id " + id); // Throws if not found
    }

    // Transfers an amount from sender's wallet to receiver's wallet
    @Override
    public Wallet walletToWalletTransfer(User sender, Wallet receiverWallet, Long amount) throws WalletException {
        Wallet senderWallet = getUserWallet(sender); // Gets sender's wallet

        // Checks if sender has sufficient balance
        if (senderWallet.getBalance().compareTo(BigDecimal.valueOf(amount)) < 0) {
            throw new WalletException("Insufficient balance...");
        }

        // Deducts amount from sender's balance
        BigDecimal senderBalance = senderWallet.getBalance().subtract(BigDecimal.valueOf(amount));
        senderWallet.setBalance(senderBalance);
        walletRepository.save(senderWallet);    // Saves updated sender wallet

        // Adds amount to receiver's balance
        BigDecimal receiverBalance = receiverWallet.getBalance();
        receiverBalance = receiverBalance.add(BigDecimal.valueOf(amount));
        receiverWallet.setBalance(receiverBalance);
        walletRepository.save(receiverWallet);  // Saves updated receiver wallet

        return senderWallet;                    // Returns sender's updated wallet
    }

    // Processes payment for an order using a user's wallet
    @Override
    public Wallet payOrderPayment(Order order, User user) throws WalletException {
        Wallet wallet = getUserWallet(user);    // Gets user's wallet

        // Creates a transaction record for the payment
        WalletTransaction walletTransaction = new WalletTransaction();
        walletTransaction.setWallet(wallet);    // Links transaction to wallet
        walletTransaction.setPurpose(order.getOrderType() + " " + order.getOrderItem().getCoin().getId()); // Sets purpose
        walletTransaction.setDate(LocalDate.now()); // Sets current date
        walletTransaction.setTransferId(order.getOrderItem().getCoin().getSymbol()); // Sets coin symbol as transfer ID

        if (order.getOrderType().equals(OrderType.BUY)) { // Handles BUY order
            // Commented-out: walletTransaction.setType(WalletTransactionType.BUY_ASSET);
            walletTransaction.setAmount(-order.getPrice().longValue()); // Negative amount for debit
            BigDecimal newBalance = wallet.getBalance().subtract(order.getPrice()); // Calculates new balance

            // Checks if sufficient funds are available
            if (newBalance.compareTo(order.getPrice()) < 0) {
                System.out.println("inside");
                throw new WalletException("Insufficient funds for this transaction.");
            }
            System.out.println("outside---------- ");
            wallet.setBalance(newBalance);      // Updates wallet balance
        } else if (order.getOrderType().equals(OrderType.SELL)) { // Handles SELL order
            // Commented-out: walletTransaction.setType(WalletTransactionType.SELL_ASSET);
            walletTransaction.setAmount(order.getPrice().longValue()); // Positive amount for credit
            BigDecimal newBalance = wallet.getBalance().add(order.getPrice()); // Calculates new balance
            wallet.setBalance(newBalance);      // Updates wallet balance
        }

        // Saves the transaction and updated wallet
        walletTransactionRepository.save(walletTransaction);
        walletRepository.save(wallet);
        return wallet;                          // Returns updated wallet
    }

    // Adds a specified amount to a wallet's balance
    @Override
    public Wallet addBalanceToWallet(Wallet wallet, Long money) throws WalletException {
        BigDecimal newBalance = wallet.getBalance().add(BigDecimal.valueOf(money)); // Calculates new balance

        // Commented-out check for negative balance (redundant since adding money can't make it negative)
//        if (newBalance.compareTo(BigDecimal.ZERO) < 0) {
//            throw new Exception("Insufficient funds for this transaction.");
//        }

        wallet.setBalance(wallet.getBalance().add(BigDecimal.valueOf(money))); // Updates balance
        walletRepository.save(wallet);          // Saves updated wallet
        System.out.println("updated wallet - " + wallet); // Logs updated wallet
        return wallet;                          // Returns updated wallet
    }
}
