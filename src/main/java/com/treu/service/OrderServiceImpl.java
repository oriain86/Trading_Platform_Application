package com.treu.service;

import com.treu.domain.OrderStatus;
import com.treu.domain.OrderType;
import com.treu.model.*;
import com.treu.repository.*;
import com.treu.repository.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

// Marks this class as a Spring service, implementing the OrderService interface
@Service
public class OrderServiceImpl implements OrderService {

    // Repository for order data access, injected via constructor
    private final OrderRepository orderRepository;

    // Service for asset-related operations, injected via constructor
    private final AssetService assetService;

    // Service for wallet operations, injected via @Autowired
    @Autowired
    private WalletService walletService;

    // Repository for order item data access, injected via @Autowired
    @Autowired
    private OrderItemRepository orderItemRepository;

    // Constructor injection for OrderRepository and AssetService
    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, AssetService assetService) {
        this.orderRepository = orderRepository;
        this.assetService = assetService;
    }

    // Creates a new order with transactional support
    @Override
    @Transactional
    public Order createOrder(User user, OrderItem orderItem, OrderType orderType) {
        // Calculates the total price based on coin's current price and quantity
        double price = orderItem.getCoin().getCurrentPrice() * orderItem.getQuantity();
        // Initializes a new order
        Order order = new Order();
        order.setUser(user);
        order.setOrderItem(orderItem);
        order.setOrderType(orderType);
        order.setPrice(BigDecimal.valueOf(price));
        order.setTimestamp(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING);
        // Saves and returns the order
        return orderRepository.save(order);
    }

    // Retrieves an order by ID, throwing an exception if not found
    @Override
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
    }

    // Fetches all orders for a user with optional filtering by order type and asset symbol
    @Override
    public List<Order> getAllOrdersForUser(Long userId, String orderType, String assetSymbol) {
        // Retrieves all orders for the user
        List<Order> allUserOrders = orderRepository.findByUserId(userId);
        // Filters by order type if provided
        if (orderType != null && !orderType.isEmpty()) {
            OrderType type = OrderType.valueOf(orderType.toUpperCase());
            allUserOrders = allUserOrders.stream()
                    .filter(order -> order.getOrderType() == type)
                    .collect(Collectors.toList());
        }
        // Filters by asset symbol if provided
        if (assetSymbol != null && !assetSymbol.isEmpty()) {
            allUserOrders = allUserOrders.stream()
                    .filter(order -> order.getOrderItem().getCoin().getSymbol().equals(assetSymbol))
                    .collect(Collectors.toList());
        }
        return allUserOrders;
    }

    // Cancels a pending order with transactional support
    @Override
    @Transactional
    public void cancelOrder(Long orderId) {
        Order order = getOrderById(orderId);
        // Checks if the order is still pending
        if (order.getStatus() == OrderStatus.PENDING) {
            order.setStatus(OrderStatus.CANCELLED);
            orderRepository.save(order);
        } else {
            throw new IllegalStateException("Cannot cancel order, it is already processed or cancelled.");
        }
    }

    // Creates an order item with buy and sell prices
    private OrderItem createOrderItem(Coin coin, double quantity, double buyPrice, double sellPrice) {
        OrderItem orderItem = new OrderItem();
        orderItem.setCoin(coin);
        orderItem.setQuantity(quantity);
        orderItem.setBuyPrice(coin.getCurrentPrice()); // Overwritten immediately below
        orderItem.setBuyPrice(buyPrice);               // Sets the buy price
        orderItem.setSellPrice(sellPrice);             // Sets the sell price
        // Saves and returns the order item
        return orderItemRepository.save(orderItem);
    }

    // Handles buying an asset with transactional support
    @Transactional
    public Order buyAsset(Coin coin, double quantity, User user) throws Exception {
        if (quantity < 0) throw new Exception("quantity should be > 0");
        double buyPrice = coin.getCurrentPrice();
        // Creates an order item for the purchase
        OrderItem orderItem = createOrderItem(coin, quantity, buyPrice, 0);
        // Creates a buy order
        Order order = createOrder(user, orderItem, OrderType.BUY);
        orderItem.setOrder(order);
        // Processes payment from the wallet
        walletService.payOrderPayment(order, user);
        // Updates order status to SUCCESS
        order.setStatus(OrderStatus.SUCCESS);
        order.setOrderType(OrderType.BUY); // Redundant; already set in createOrder
        Order savedOrder = orderRepository.save(order);
        // Manages the user's asset
        Asset oldAsset = assetService.findAssetByUserIdAndCoinId(order.getUser().getId(), order.getOrderItem().getCoin().getId());
        if (oldAsset == null) {
            assetService.createAsset(user, orderItem.getCoin(), orderItem.getQuantity());
        } else {
            assetService.updateAsset(oldAsset.getId(), quantity);
        }
        return savedOrder;
    }

    // Handles selling an asset with transactional support
    @Transactional
    public Order sellAsset(Coin coin, double quantity, User user) throws Exception {
        double sellPrice = coin.getCurrentPrice();
        // Checks if the user owns the asset to sell
        Asset assetToSell = assetService.findAssetByUserIdAndCoinId(user.getId(), coin.getId());
        if (assetToSell != null) {
            OrderItem orderItem = createOrderItem(coin, quantity, assetToSell.getBuyPrice(), sellPrice);
            Order order = createOrder(user, orderItem, OrderType.SELL);
            orderItem.setOrder(order);
            Order savedOrder = orderRepository.save(order);
            // Verifies sufficient quantity to sell
            if (assetToSell.getQuantity() >= quantity) {
                walletService.payOrderPayment(order, user); // Likely credits the wallet
                Asset updatedAsset = assetService.updateAsset(assetToSell.getId(), -quantity);
                // Deletes the asset if its value becomes negligible
                if (updatedAsset.getQuantity() * coin.getCurrentPrice() <= 1) {
                    assetService.deleteAsset(updatedAsset.getId());
                }
                return savedOrder;
            } else {
                orderRepository.delete(order);
                throw new Exception("Insufficient quantity to sell");
            }
        }
        throw new Exception("Asset not found for selling");
    }

    // Processes an order (buy or sell) with transactional support
    @Override
    @Transactional
    public Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception {
        if (orderType == OrderType.BUY) {
            return buyAsset(coin, quantity, user);
        } else if (orderType == OrderType.SELL) {
            return sellAsset(coin, quantity, user);
        } else {
            throw new Exception("Invalid order type");
        }
    }
}
