package com.treu.service;

import com.treu.domain.OrderType;
import com.treu.model.Coin;
import com.treu.model.Order;
import com.treu.model.OrderItem;
import com.treu.model.User;

import java.util.List;

// Defines the contract for order-related business logic in the application
public interface OrderService {

    // Creates a new order for a user with a specific order item and type
    Order createOrder(User user, OrderItem orderItem, OrderType orderType);

    // Retrieves an order by its unique ID
    Order getOrderById(Long orderId);

    // Fetches all orders for a user, optionally filtered by order type and asset symbol
    List<Order> getAllOrdersForUser(Long userId, String orderType, String assetSymbol);

    // Cancels an existing order by its ID
    void cancelOrder(Long orderId);

    // Commented-out method for buying an asset (incomplete or not implemented)
//    Order buyAsset(CreateOrderRequest req, Long userId, String jwt) throws Exception;

    // Processes an order (buy or sell) for a specific coin, quantity, and user
    Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception;

    // Commented-out method for selling an asset (incomplete or not implemented)
//    Order sellAsset(CreateOrderRequest req, Long userId, String jwt) throws Exception;
}
