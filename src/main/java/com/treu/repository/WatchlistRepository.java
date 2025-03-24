package com.treu.repository;

// Entity class representing a watchlist in the system
import com.treu.model.Watchlist;
// Spring Data JPAs repository interface providing CRUD operations
import org.springframework.data.jpa.repository.JpaRepository;

// Defines a repository interface for Watchlist entity management
public interface WatchlistRepository extends JpaRepository<Watchlist, Long> {

    // Retrieves a watchlist by the associated user's ID
    Watchlist findByUserId(Long userId);
}
