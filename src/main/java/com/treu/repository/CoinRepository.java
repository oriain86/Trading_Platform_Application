package com.treu.repository;

// Entity class representing a cryptocurrency in the system
import com.treu.model.Coin;
// Spring Data JPAs repository interface providing CRUD operations
import org.springframework.data.jpa.repository.JpaRepository;

// Defines a repository interface for Coin entity management
public interface CoinRepository extends JpaRepository<Coin, String> {
}
