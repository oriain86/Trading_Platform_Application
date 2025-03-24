package com.treu.repository;

// Entity class representing an order in the system
import com.treu.model.Order;
// Spring Data JPA's repository interface providing CRUD operations
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;             // Interface for ordered collections

// Defines a repository interface for Order entity management
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Retrieves a list of orders for a specific user by their user ID
    public List<Order> findByUserId(Long userId);
}
