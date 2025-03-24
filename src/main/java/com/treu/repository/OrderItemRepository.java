package com.treu.repository;

// Entity class representing an order item in the system
import com.treu.model.OrderItem;
// Spring Data JPAs repository interface providing CRUD operations
import org.springframework.data.jpa.repository.JpaRepository;

// Defines a repository interface for OrderItem entity management
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
