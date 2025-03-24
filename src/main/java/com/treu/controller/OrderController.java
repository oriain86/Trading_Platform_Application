package com.treu.controller;

import com.treu.model.Coin;
import com.treu.model.Order;
import com.treu.model.User;
import com.treu.request.CreateOrderRequest;
import com.treu.service.CoinService;
import com.treu.service.OrderService;
import com.treu.service.UserService;
import com.treu.service.WalletTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Marks this class as a REST controller, handling order-related requests under /api/orders
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    // Service for handling order-related business logic
    private OrderService orderService;

    // Service for handling user-related operations (note: typo in variable name "userSerivce")
    private UserService userSerivce;

    // Service for coin-related operations, injected via @Autowired
    @Autowired
    private CoinService coinService;

    // Service for wallet transaction operations, injected via @Autowired
    @Autowired
    private WalletTransactionService walletTransactionService;

    // Constructor injection for OrderService and UserService
    @Autowired
    public OrderController(OrderService orderService, UserService userSerivce) {
        this.orderService = orderService;
        this.userSerivce = userSerivce;
    }

    // Handles POST requests to create and pay for an order
    @PostMapping("/pay")
    public ResponseEntity<Order> payOrderPayment(
            @RequestHeader("Authorization") String jwt,      // JWT from the Authorization header
            @RequestBody CreateOrderRequest req              // Order request details (coinId, quantity, orderType)
    ) throws Exception {
        // Retrieves the user associated with the JWT
        User user = userSerivce.findUserProfileByJwt(jwt);
        // Fetches the coin by its ID from the request
        Coin coin = coinService.findById(req.getCoinId());
        // Processes the order (e.g., buy/sell) and returns the created order
        Order order = orderService.processOrder(coin, req.getQuantity(), req.getOrderType(), user);
        // Returns the order with HTTP 200 (OK)
        return ResponseEntity.ok(order);
    }

    // Handles GET requests to retrieve an order by its ID
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(
            @RequestHeader("Authorization") String jwtToken, // JWT from the Authorization header
            @PathVariable Long orderId                       // Order ID from the URL path
    ) throws Exception {
        // Checks if the JWT is present; throws an exception if missing
        if (jwtToken == null) {
            throw new Exception("token missing...");
        }
        // Retrieves the user associated with the JWT
        User user = userSerivce.findUserProfileByJwt(jwtToken);
        // Fetches the order by its ID
        Order order = orderService.getOrderById(orderId);
        // Verifies the order belongs to the authenticated user
        if (order.getUser().getId().equals(user.getId())) {
            // Returns the order with HTTP 200 (OK) if the user owns it
            return ResponseEntity.ok(order);
        } else {
            // Returns HTTP 403 (Forbidden) if the user doesn't own the order
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    // Handles GET requests to retrieve all orders for the authenticated user
    @GetMapping()
    public ResponseEntity<List<Order>> getAllOrdersForUser(
            @RequestHeader("Authorization") String jwtToken,  // JWT from the Authorization header
            @RequestParam(required = false) String order_type, // Optional filter for order type (e.g., buy/sell)
            @RequestParam(required = false) String asset_symbol // Optional filter for asset symbol (e.g., BTC)
    ) throws Exception {
        // Checks if the JWT is present; throws an exception if missing
        if (jwtToken == null) {
            throw new Exception("token missing...");
        }
        // Retrieves the user's ID from the JWT
        Long userId = userSerivce.findUserProfileByJwt(jwtToken).getId();
        // Fetches all orders for the user, optionally filtered by order type and asset symbol
        List<Order> userOrders = orderService.getAllOrdersForUser(userId, order_type, asset_symbol);
        // Returns the list of orders with HTTP 200 (OK)
        return ResponseEntity.ok(userOrders);
    }
}
