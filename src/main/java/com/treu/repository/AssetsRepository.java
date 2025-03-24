package com.treu.repository;

// Entity class representing an asset in the system
import com.treu.model.Asset;
// Spring Data JPAs repository interface providing CRUD operations
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;             // Interface for ordered collections

// Defines a repository interface for Asset entity management
public interface AssetsRepository extends JpaRepository<Asset, Long> {
    // Retrieves a list of assets for a specific user by their user ID
    public List<Asset> findByUserId(Long userId);

    // Finds a single asset by user ID and coin ID
    Asset findByUserIdAndCoinId(Long userId, String coinId);

    // Finds a single asset by asset ID and user ID
    Asset findByIdAndUserId(Long assetId, Long userId);


//   Optional<Assets> findByUserIdAndSymbolAndPortfolioId(Long userId, String symbol, Long portfolioId);
}
