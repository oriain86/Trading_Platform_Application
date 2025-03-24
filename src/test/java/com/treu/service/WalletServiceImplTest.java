package com.treu.service;

import com.treu.domain.OrderType;
import com.treu.exception.WalletException;
import com.treu.model.*;
import com.treu.repository.WalletRepository;
import com.treu.repository.WalletTransactionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class WalletServiceImplTest {

    // Mocks for dependencies
    @Mock
    private WalletRepository walletRepository;

    @Mock
    private WalletTransactionRepository walletTransactionRepository;

    // Inject mocks into the service implementation
    @InjectMocks
    private WalletServiceImpl walletService;

    private User user;

    @BeforeEach
    public void setup() {
        // Create a sample user for tests
        user = new User();
        user.setId(1L);
    }

    @Test
    public void testGenrateWallete() {
        // Prepare a new wallet with zero balance for the given user
        Wallet wallet = new Wallet();
        wallet.setUser(user);
        wallet.setBalance(BigDecimal.ZERO);
        // Stub save method to return the wallet
        when(walletRepository.save(any(Wallet.class))).thenReturn(wallet);

        // Call the method under test
        Wallet createdWallet = walletService.genrateWallete(user);

        // Verify wallet creation and association with the user
        assertNotNull(createdWallet);
        assertEquals(user, createdWallet.getUser());
        verify(walletRepository, times(1)).save(any(Wallet.class));
    }

    @Test
    public void testGetUserWallet_WhenWalletExists() throws WalletException {
        // Create an existing wallet with a preset balance
        Wallet existingWallet = new Wallet();
        existingWallet.setUser(user);
        existingWallet.setBalance(BigDecimal.valueOf(100));
        // Stub findByUserId to return the existing wallet
        when(walletRepository.findByUserId(user.getId())).thenReturn(existingWallet);

        // Call the method under test
        Wallet result = walletService.getUserWallet(user);

        // Verify that the existing wallet is returned without saving a new one
        assertEquals(existingWallet, result);
        verify(walletRepository, times(1)).findByUserId(user.getId());
        verify(walletRepository, never()).save(any(Wallet.class));
    }

    @Test
    public void testGetUserWallet_WhenWalletDoesNotExist() throws WalletException {
        // Simulate no wallet existing for the user
        when(walletRepository.findByUserId(user.getId())).thenReturn(null);
        // Prepare a new wallet to be saved
        Wallet newWallet = new Wallet();
        newWallet.setUser(user);
        newWallet.setBalance(BigDecimal.ZERO);
        when(walletRepository.save(any(Wallet.class))).thenReturn(newWallet);

        // Call the method under test
        Wallet result = walletService.getUserWallet(user);

        // Verify that a new wallet is created and associated with the user
        assertNotNull(result);
        assertEquals(user, result.getUser());
        verify(walletRepository, times(1)).findByUserId(user.getId());
        verify(walletRepository, times(1)).save(any(Wallet.class));
    }

    @Test
    public void testFindWalletById_WhenWalletExists() throws WalletException {
        // Prepare a wallet with a specific ID
        Wallet wallet = new Wallet();
        wallet.setId(10L);
        when(walletRepository.findById(10L)).thenReturn(Optional.of(wallet));

        // Call the method under test
        Wallet result = walletService.findWalletById(10L);

        // Verify that the correct wallet is returned
        assertNotNull(result);
        assertEquals(10L, result.getId());
        verify(walletRepository, times(1)).findById(10L);
    }

    @Test
    public void testFindWalletById_WhenWalletNotFound() {
        // Stub findById to return empty, simulating a missing wallet
        when(walletRepository.findById(20L)).thenReturn(Optional.empty());

        // Expect a WalletException when no wallet is found
        WalletException exception = assertThrows(WalletException.class, () -> {
            walletService.findWalletById(20L);
        });
        assertTrue(exception.getMessage().contains("Wallet not found with id 20"));
        verify(walletRepository, times(1)).findById(20L);
    }

    @Test
    public void testWalletToWalletTransfer_WhenInsufficientFunds() {
        // Create a sender with an insufficient balance
        User sender = new User();
        sender.setId(2L);
        Wallet senderWallet = new Wallet();
        senderWallet.setUser(sender);
        senderWallet.setBalance(BigDecimal.valueOf(50));
        when(walletRepository.findByUserId(sender.getId())).thenReturn(senderWallet);

        // Receiver wallet setup
        Wallet receiverWallet = new Wallet();
        receiverWallet.setBalance(BigDecimal.valueOf(100));

        // Expect an exception due to insufficient funds for the transfer
        WalletException exception = assertThrows(WalletException.class, () -> {
            walletService.walletToWalletTransfer(sender, receiverWallet, 100L);
        });
        assertTrue(exception.getMessage().contains("Insufficient balance"));
        verify(walletRepository, times(1)).findByUserId(sender.getId());
    }

    @Test
    public void testWalletToWalletTransfer_WhenSufficientFunds() throws WalletException {
        // Create a sender with sufficient funds
        User sender = new User();
        sender.setId(3L);
        Wallet senderWallet = new Wallet();
        senderWallet.setUser(sender);
        senderWallet.setBalance(BigDecimal.valueOf(200));
        when(walletRepository.findByUserId(sender.getId())).thenReturn(senderWallet);

        // Receiver wallet with initial balance
        Wallet receiverWallet = new Wallet();
        receiverWallet.setBalance(BigDecimal.valueOf(50));

        // Stub the save method to return the wallet passed to it
        when(walletRepository.save(any(Wallet.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Execute the transfer of 100 units
        Wallet updatedSenderWallet = walletService.walletToWalletTransfer(sender, receiverWallet, 100L);

        // Assert that sender's balance decreases and receiver's balance increases by 100
        assertEquals(BigDecimal.valueOf(100), updatedSenderWallet.getBalance());
        assertEquals(BigDecimal.valueOf(150), receiverWallet.getBalance());
        verify(walletRepository, times(2)).save(any(Wallet.class));
    }

    @Test
    public void testPayOrderPayment_BuyOrder_InsufficientFunds() {
        // Setup for a BUY order with insufficient wallet funds
        User buyUser = new User();
        buyUser.setId(4L);
        Wallet wallet = new Wallet();
        wallet.setUser(buyUser);
        wallet.setBalance(BigDecimal.valueOf(10));
        when(walletRepository.findByUserId(buyUser.getId())).thenReturn(wallet);

        Order order = new Order();
        order.setOrderType(OrderType.BUY);
        // Use mocks for OrderItem and Coin to satisfy type requirements
        OrderItem orderItem = mock(OrderItem.class);
        Coin coin = mock(Coin.class);
        when(orderItem.getCoin()).thenReturn(coin);
        when(coin.getId()).thenReturn("coin1");
        when(coin.getSymbol()).thenReturn("SYM");
        order.setOrderItem(orderItem);
        order.setPrice(BigDecimal.valueOf(10));

        // Expect an exception due to insufficient funds for the BUY order
        WalletException exception = assertThrows(WalletException.class, () -> {
            walletService.payOrderPayment(order, buyUser);
        });
        assertTrue(exception.getMessage().contains("Insufficient funds"));
    }

    @Test
    public void testPayOrderPayment_BuyOrder_SufficientFunds() throws WalletException {
        // Setup for a BUY order with sufficient funds
        User buyUser = new User();
        buyUser.setId(5L);
        Wallet wallet = new Wallet();
        wallet.setUser(buyUser);
        wallet.setBalance(BigDecimal.valueOf(30));
        when(walletRepository.findByUserId(buyUser.getId())).thenReturn(wallet);

        Order order = new Order();
        order.setOrderType(OrderType.BUY);
        OrderItem orderItem = mock(OrderItem.class);
        Coin coin = mock(Coin.class);
        when(orderItem.getCoin()).thenReturn(coin);
        when(coin.getId()).thenReturn("coin2");
        when(coin.getSymbol()).thenReturn("BTC");
        order.setOrderItem(orderItem);
        order.setPrice(BigDecimal.valueOf(10));

        // Stub saving transaction and wallet update
        when(walletTransactionRepository.save(any(WalletTransaction.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));
        when(walletRepository.save(any(Wallet.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        // Execute the BUY order payment
        Wallet updatedWallet = walletService.payOrderPayment(order, buyUser);

        // Assert that the wallet balance decreased by the order price
        assertEquals(BigDecimal.valueOf(20), updatedWallet.getBalance());
        verify(walletTransactionRepository, times(1)).save(any(WalletTransaction.class));
    }

    @Test
    public void testPayOrderPayment_SellOrder() throws WalletException {
        // Setup for a SELL order where funds are credited
        User sellUser = new User();
        sellUser.setId(6L);
        Wallet wallet = new Wallet();
        wallet.setUser(sellUser);
        wallet.setBalance(BigDecimal.valueOf(50));
        when(walletRepository.findByUserId(sellUser.getId())).thenReturn(wallet);

        Order order = new Order();
        order.setOrderType(OrderType.SELL);
        OrderItem orderItem = mock(OrderItem.class);
        Coin coin = mock(Coin.class);
        when(orderItem.getCoin()).thenReturn(coin);
        when(coin.getId()).thenReturn("coin3");
        when(coin.getSymbol()).thenReturn("ETH");
        order.setOrderItem(orderItem);
        order.setPrice(BigDecimal.valueOf(20));

        // Stub saving for transaction and wallet update
        when(walletTransactionRepository.save(any(WalletTransaction.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));
        when(walletRepository.save(any(Wallet.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        // Execute the SELL order payment
        Wallet updatedWallet = walletService.payOrderPayment(order, sellUser);

        // Verify that the wallet balance increases correctly
        assertEquals(BigDecimal.valueOf(70), updatedWallet.getBalance());
        verify(walletTransactionRepository, times(1)).save(any(WalletTransaction.class));
    }

    @Test
    public void testAddBalanceToWallet() throws WalletException {
        // Create a wallet with an initial balance
        Wallet wallet = new Wallet();
        wallet.setBalance(BigDecimal.valueOf(100));
        when(walletRepository.save(any(Wallet.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Add 50 units to the wallet balance
        Wallet updatedWallet = walletService.addBalanceToWallet(wallet, 50L);

        // Verify that the wallet balance increases by 50
        assertEquals(BigDecimal.valueOf(150), updatedWallet.getBalance());
        verify(walletRepository, times(1)).save(wallet);
    }
}
