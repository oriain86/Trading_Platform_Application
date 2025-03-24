package com.treu.repository;

// Entity class representing a payment order in the system
import com.treu.model.PaymentOrder;
// Spring Data JPAs repository interface providing CRUD operations
import org.springframework.data.jpa.repository.JpaRepository;

// Defines a repository interface for PaymentOrder entity management
public interface PaymentOrderRepository extends JpaRepository<PaymentOrder, Long> {
}
