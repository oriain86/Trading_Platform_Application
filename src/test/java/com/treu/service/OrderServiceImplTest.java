package com.treu.service;

import com.treu.domain.OrderStatus;
import com.treu.domain.OrderType;
import com.treu.model.*;
import com.treu.repository.OrderItemRepository;
import com.treu.repository.OrderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.test.util.ReflectionTestUtils;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

public class OrderServiceImplTest {

    // Mock dependencies
    private OrderRepository orderRepository;
    private AssetService assetService;
    private WalletService walletService;
    private OrderItemRepository orderItemRepository;

    // Service under test
    private OrderServiceImpl orderService;

    // Test data
    private User testUser;
    private Coin testCoin;
    private Order testOrder;
    private OrderItem testOrderItem;
    private Asset testAsset;
    private Wallet testWallet;

    @BeforeEach
    void setUp() {
        // Initialize mocks
        orderRepository = Mockito.mock(OrderRepository.class);
        assetService = Mockito.mock(AssetService.class);
        walletService = Mockito.mock(WalletService.class);
        orderItemRepository = Mockito.mock(OrderItemRepository.class);

        // Create service with constructor-injected dependencies
        orderService = new OrderServiceImpl(orderRepository, assetService);

        // Set field-injected dependencies using reflection
        ReflectionTestUtils.setField(orderService, "walletService", walletService);
        ReflectionTestUtils.setField(orderService, "orderItemRepository", orderItemRepository);

        // Set up test user
        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("test@example.com");

        // Set up test coin
        testCoin = new Coin();
        testCoin.setId("1");
        testCoin.setSymbol("BTC");
        testCoin.setName("Bitcoin");
        testCoin.setCurrentPrice(50000.0);

        // Set up test order item
        testOrderItem = new OrderItem();
        testOrderItem.setId(1L);
        testOrderItem.setCoin(testCoin);
        testOrderItem.setQuantity(0.5);
        testOrderItem.setBuyPrice(50000.0);
        testOrderItem.setSellPrice(0.0);

        // Set up test order
        testOrder = new Order();
        testOrder.setId(1L);
        testOrder.setUser(testUser);
        testOrder.setOrderItem(testOrderItem);
        testOrderItem.setOrder(testOrder);
        testOrder.setOrderType(OrderType.BUY);
        testOrder.setPrice(BigDecimal.valueOf(25000.0)); // 0.5 BTC * $50,000
        testOrder.setStatus(OrderStatus.PENDING);
        testOrder.setTimestamp(LocalDateTime.now());

        // Set up test asset
        testAsset = new Asset();
        testAsset.setId(1L);
        testAsset.setUser(testUser);
        testAsset.setCoin(testCoin);
        testAsset.setQuantity(1.0);
        testAsset.setBuyPrice(48000.0);

        // Set up test wallet
        testWallet = new Wallet();
        testWallet.setId(1L);
        testWallet.setUser(testUser);
    }

    @Test
    void createOrder_ShouldCreateAndSaveOrder() {
        // Arrange
        when(orderRepository.save(any(Order.class))).thenReturn(testOrder);

        // Act
        Order result = orderService.createOrder(testUser, testOrderItem, OrderType.BUY);

        // Assert
        assertNotNull(result);
        assertEquals(testUser, result.getUser());
        assertEquals(testOrderItem, result.getOrderItem());
        assertEquals(OrderType.BUY, result.getOrderType());
        assertEquals(OrderStatus.PENDING, result.getStatus());

        // Verify that orderRepository.save was called once
        verify(orderRepository).save(any(Order.class));
    }

    @Test
    void getOrderById_WhenOrderExists_ShouldReturnOrder() {
        // Arrange
        when(orderRepository.findById(1L)).thenReturn(Optional.of(testOrder));

        // Act
        Order result = orderService.getOrderById(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals(testUser, result.getUser());

        // Verify repository was called with correct ID
        verify(orderRepository).findById(1L);
    }

    @Test
    void getOrderById_WhenOrderDoesNotExist_ShouldThrowException() {
        // Arrange
        when(orderRepository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            orderService.getOrderById(99L);
        });

        assertEquals("Order not found", exception.getMessage());
        verify(orderRepository).findById(99L);
    }

    @Test
    void getAllOrdersForUser_WithoutFilters_ShouldReturnAllUserOrders() {
        // Arrange
        List<Order> orderList = new ArrayList<>();
        orderList.add(testOrder);

        Order secondOrder = new Order();
        secondOrder.setId(2L);
        secondOrder.setUser(testUser);
        secondOrder.setOrderItem(testOrderItem);
        secondOrder.setOrderType(OrderType.SELL);
        orderList.add(secondOrder);

        when(orderRepository.findByUserId(1L)).thenReturn(orderList);

        // Act
        List<Order> result = orderService.getAllOrdersForUser(1L, null, null);

        // Assert
        assertEquals(2, result.size());
        verify(orderRepository).findByUserId(1L);
    }

    @Test
    void getAllOrdersForUser_WithOrderTypeFilter_ShouldReturnFilteredOrders() {
        // Arrange
        List<Order> orderList = new ArrayList<>();
        orderList.add(testOrder); // BUY order

        Order sellOrder = new Order();
        sellOrder.setId(2L);
        sellOrder.setUser(testUser);
        sellOrder.setOrderItem(testOrderItem);
        sellOrder.setOrderType(OrderType.SELL);
        orderList.add(sellOrder);

        when(orderRepository.findByUserId(1L)).thenReturn(orderList);

        // Act
        List<Order> result = orderService.getAllOrdersForUser(1L, "BUY", null);

        // Assert
        assertEquals(1, result.size());
        assertEquals(OrderType.BUY, result.get(0).getOrderType());
        verify(orderRepository).findByUserId(1L);
    }

    @Test
    void getAllOrdersForUser_WithAssetSymbolFilter_ShouldReturnFilteredOrders() {
        // Arrange
        List<Order> orderList = new ArrayList<>();
        orderList.add(testOrder); // BTC

        Coin ethCoin = new Coin();
        ethCoin.setId("2");
        ethCoin.setSymbol("ETH");
        ethCoin.setCurrentPrice(3000.0);

        OrderItem ethOrderItem = new OrderItem();
        ethOrderItem.setCoin(ethCoin);

        Order ethOrder = new Order();
        ethOrder.setId(2L);
        ethOrder.setUser(testUser);
        ethOrder.setOrderItem(ethOrderItem);
        orderList.add(ethOrder);

        when(orderRepository.findByUserId(1L)).thenReturn(orderList);

        // Act
        List<Order> result = orderService.getAllOrdersForUser(1L, null, "BTC");

        // Assert
        assertEquals(1, result.size());
        assertEquals("BTC", result.get(0).getOrderItem().getCoin().getSymbol());
        verify(orderRepository).findByUserId(1L);
    }

    @Test
    void cancelOrder_WithPendingOrder_ShouldUpdateStatus() {
        // Arrange
        when(orderRepository.findById(1L)).thenReturn(Optional.of(testOrder));
        when(orderRepository.save(any(Order.class))).thenReturn(testOrder);

        // Act
        orderService.cancelOrder(1L);

        // Assert
        ArgumentCaptor<Order> orderCaptor = ArgumentCaptor.forClass(Order.class);
        verify(orderRepository).save(orderCaptor.capture());
        assertEquals(OrderStatus.CANCELLED, orderCaptor.getValue().getStatus());
    }

    @Test
    void cancelOrder_WithNonPendingOrder_ShouldThrowException() {
        // Arrange
        testOrder.setStatus(OrderStatus.SUCCESS);
        when(orderRepository.findById(1L)).thenReturn(Optional.of(testOrder));

        // Act & Assert
        IllegalStateException exception = assertThrows(IllegalStateException.class, () -> {
            orderService.cancelOrder(1L);
        });

        assertEquals("Cannot cancel order, it is already processed or cancelled.", exception.getMessage());
        verify(orderRepository, never()).save(any(Order.class));
    }

    @Test
    void buyAsset_WithValidParameters_ShouldCreateOrderAndAsset() throws Exception {
        // Arrange
        // For createOrderItem method
        when(orderItemRepository.save(any(OrderItem.class))).thenReturn(testOrderItem);

        // For createOrder method
        when(orderRepository.save(any(Order.class))).thenReturn(testOrder);

        // Asset doesn't exist yet
        when(assetService.findAssetByUserIdAndCoinId(anyLong(), anyString())).thenReturn(null);

        // WalletService
        when(walletService.payOrderPayment(any(Order.class), any(User.class))).thenReturn(testWallet);

        // Asset creation
        when(assetService.createAsset(any(User.class), any(Coin.class), anyDouble())).thenReturn(testAsset);

        // Act
        Order result = orderService.buyAsset(testCoin, 0.5, testUser);

        // Assert
        assertNotNull(result);
        assertEquals(OrderStatus.SUCCESS, result.getStatus());
        verify(orderItemRepository).save(any(OrderItem.class));
        verify(orderRepository, times(2)).save(any(Order.class)); // Once in createOrder, once after status update
        verify(walletService).payOrderPayment(any(Order.class), eq(testUser));
        verify(assetService).createAsset(eq(testUser), eq(testCoin), eq(0.5));
    }

    @Test
    void buyAsset_WithExistingAsset_ShouldUpdateAsset() throws Exception {
        // Arrange
        when(orderItemRepository.save(any(OrderItem.class))).thenReturn(testOrderItem);
        when(orderRepository.save(any(Order.class))).thenReturn(testOrder);
        when(assetService.findAssetByUserIdAndCoinId(anyLong(), anyString())).thenReturn(testAsset);
        when(walletService.payOrderPayment(any(Order.class), any(User.class))).thenReturn(testWallet);
        when(assetService.updateAsset(anyLong(), anyDouble())).thenReturn(testAsset);

        // Act
        Order result = orderService.buyAsset(testCoin, 0.5, testUser);

        // Assert
        assertNotNull(result);
        verify(assetService).updateAsset(eq(1L), eq(0.5)); // Should update existing asset
    }

    @Test
    void buyAsset_WithNegativeQuantity_ShouldThrowException() {
        // Act & Assert
        Exception exception = assertThrows(Exception.class, () -> {
            orderService.buyAsset(testCoin, -0.5, testUser);
        });

        assertEquals("quantity should be > 0", exception.getMessage());
        verify(orderItemRepository, never()).save(any(OrderItem.class));
    }

    @Test
    void sellAsset_WithSufficientQuantity_ShouldProcessSale() throws Exception {
        // Arrange
        when(assetService.findAssetByUserIdAndCoinId(anyLong(), anyString())).thenReturn(testAsset);
        when(orderItemRepository.save(any(OrderItem.class))).thenReturn(testOrderItem);
        when(orderRepository.save(any(Order.class))).thenReturn(testOrder);
        when(walletService.payOrderPayment(any(Order.class), any(User.class))).thenReturn(testWallet);
        when(assetService.updateAsset(anyLong(), anyDouble())).thenReturn(testAsset);

        // Act
        Order result = orderService.sellAsset(testCoin, 0.5, testUser);

        // Assert
        assertNotNull(result);
        verify(assetService).updateAsset(eq(1L), eq(-0.5)); // Should decrease asset quantity
    }

    @Test
    void sellAsset_WithInsufficientQuantity_ShouldThrowException() throws Exception {
        // Arrange
        testAsset.setQuantity(0.2); // Only has 0.2 BTC
        when(assetService.findAssetByUserIdAndCoinId(anyLong(), anyString())).thenReturn(testAsset);
        when(orderItemRepository.save(any(OrderItem.class))).thenReturn(testOrderItem);
        when(orderRepository.save(any(Order.class))).thenReturn(testOrder);
        doNothing().when(orderRepository).delete(any(Order.class));

        // Act & Assert
        Exception exception = assertThrows(Exception.class, () -> {
            orderService.sellAsset(testCoin, 0.5, testUser); // Trying to sell 0.5
        });

        assertEquals("Insufficient quantity to sell", exception.getMessage());
        verify(orderRepository).delete(any(Order.class)); // Should delete the created order
    }

    @Test
    void sellAsset_WithNoAsset_ShouldThrowException() throws Exception {
        // Arrange
        when(assetService.findAssetByUserIdAndCoinId(anyLong(), anyString())).thenReturn(null);

        // Act & Assert
        Exception exception = assertThrows(Exception.class, () -> {
            orderService.sellAsset(testCoin, 0.5, testUser);
        });

        assertEquals("Asset not found for selling", exception.getMessage());
    }

    @Test
    void sellAsset_WithNegligibleRemainingValue_ShouldDeleteAsset() throws Exception {
        // Arrange
        // Set up asset with small quantity that will be negligible after sale
        Asset smallAsset = new Asset();
        smallAsset.setId(1L);
        smallAsset.setUser(testUser);
        smallAsset.setCoin(testCoin);
        smallAsset.setQuantity(0.5001); // Will have 0.0001 BTC left after selling 0.5

        when(assetService.findAssetByUserIdAndCoinId(anyLong(), anyString())).thenReturn(smallAsset);
        when(orderItemRepository.save(any(OrderItem.class))).thenReturn(testOrderItem);
        when(orderRepository.save(any(Order.class))).thenReturn(testOrder);
        when(walletService.payOrderPayment(any(Order.class), any(User.class))).thenReturn(testWallet);

        Asset updatedAsset = new Asset();
        updatedAsset.setId(1L);
        updatedAsset.setQuantity(0.0001); // 0.0001 BTC left after selling 0.5
        updatedAsset.setCoin(testCoin); // 0.0001 * 50000 = $5 (so this won't be deleted)

        when(assetService.updateAsset(anyLong(), anyDouble())).thenReturn(updatedAsset);
        doNothing().when(assetService).deleteAsset(anyLong());

        // Act
        Order result = orderService.sellAsset(testCoin, 0.5, testUser);

        // Assert
        assertNotNull(result);
        // It won't be deleted because 0.0001 BTC at $50,000 is worth $5
        verify(assetService, never()).deleteAsset(anyLong());

        // Now test with a truly negligible amount
        updatedAsset.setQuantity(0.00001); // Only 0.00001 BTC left (worth $0.50 at $50,000)

        // Act again with a different arrangement
        when(assetService.updateAsset(anyLong(), anyDouble())).thenReturn(updatedAsset);
        result = orderService.sellAsset(testCoin, 0.5, testUser);

        // Now it should be deleted since value is <= $1
        verify(assetService).deleteAsset(eq(1L));
    }

    @Test
    void processOrder_WithBuyType_ShouldCallBuyAsset() throws Exception {
        // Arrange
        when(orderItemRepository.save(any(OrderItem.class))).thenReturn(testOrderItem);
        when(orderRepository.save(any(Order.class))).thenReturn(testOrder);
        when(assetService.findAssetByUserIdAndCoinId(anyLong(), anyString())).thenReturn(null);
        when(walletService.payOrderPayment(any(Order.class), any(User.class))).thenReturn(testWallet);
        when(assetService.createAsset(any(User.class), any(Coin.class), anyDouble())).thenReturn(testAsset);

        // Act
        Order result = orderService.processOrder(testCoin, 0.5, OrderType.BUY, testUser);

        // Assert
        assertNotNull(result);
        assertEquals(OrderStatus.SUCCESS, result.getStatus());
    }

    @Test
    void processOrder_WithSellType_ShouldCallSellAsset() throws Exception {
        // Arrange
        when(assetService.findAssetByUserIdAndCoinId(anyLong(), anyString())).thenReturn(testAsset);
        when(orderItemRepository.save(any(OrderItem.class))).thenReturn(testOrderItem);
        when(orderRepository.save(any(Order.class))).thenReturn(testOrder);
        when(walletService.payOrderPayment(any(Order.class), any(User.class))).thenReturn(testWallet);
        when(assetService.updateAsset(anyLong(), anyDouble())).thenReturn(testAsset);

        // Act
        Order result = orderService.processOrder(testCoin, 0.5, OrderType.SELL, testUser);

        // Assert
        assertNotNull(result);
    }

    @Test
    void processOrder_WithInvalidType_ShouldThrowException() {
        // Act & Assert
        Exception exception = assertThrows(Exception.class, () -> {
            orderService.processOrder(testCoin, 0.5, null, testUser);
        });

        assertEquals("Invalid order type", exception.getMessage());
    }
}
