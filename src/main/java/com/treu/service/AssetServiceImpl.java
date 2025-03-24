package com.treu.service;

// Entity class representing an asset in the system
import com.treu.model.Asset;
// Entity class representing a cryptocurrency in the system
import com.treu.model.Coin;
// Entity class representing a user in the system
import com.treu.model.User;
// Repository interface for asset data access
import com.treu.repository.AssetsRepository;
// Spring annotation for dependency injection
import org.springframework.beans.factory.annotation.Autowired;
// Spring annotation to mark this class as a service component
import org.springframework.stereotype.Service;

import java.util.List;             // Interface for ordered collections

// Marks this class as a Spring service bean
@Service
public class AssetServiceImpl implements AssetService {
    // Repository for performing CRUD operations on Asset entities
    private final AssetsRepository assetRepository;

    // Constructor-based dependency injection of the AssetsRepository
    @Autowired
    public AssetServiceImpl(AssetsRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    // Creates a new asset for a user with the specified coin and quantity
    @Override
    public Asset createAsset(User user, Coin coin, double quantity) {
        Asset asset = new Asset();              // Initializes a new Asset object
        asset.setQuantity(quantity);            // Sets the quantity of the asset
        asset.setBuyPrice(coin.getCurrentPrice()); // Sets buy price to the coin's current price
        asset.setCoin(coin);                    // Associates the asset with the coin
        asset.setUser(user);                    // Links the asset to the user
        return assetRepository.save(asset);     // Saves and returns the new asset
    }

    // Commented-out method: Would reuse createAsset to buy an asset
//    public Asset buyAsset(User user, Coin coin, Long quantity) {
//        return createAsset(user, coin, quantity);
//    }

    // Retrieves an asset by its ID, throws an exception if not found
    public Asset getAssetById(Long assetId) {
        return assetRepository.findById(assetId)
                .orElseThrow(() -> new IllegalArgumentException("Asset not found"));
    }

    // Retrieves an asset by user ID and asset ID
    @Override
    public Asset getAssetByUserAndId(Long userId, Long assetId) {
        return assetRepository.findByIdAndUserId(assetId, userId); // Returns null if not found
    }

    // Retrieves all assets for a specific user
    @Override
    public List<Asset> getUsersAssets(Long userId) {
        return assetRepository.findByUserId(userId); // Returns a list of user's assets
    }

    // Updates an asset's quantity by adding to the existing amount, throws exception if not found
    @Override
    public Asset updateAsset(Long assetId, double quantity) throws Exception {
        Asset oldAsset = getAssetById(assetId);     // Fetches the existing asset
        if (oldAsset == null) {                     // Checks if asset exists
            throw new Exception("Asset not found...");
        }
        oldAsset.setQuantity(quantity + oldAsset.getQuantity()); // Adds new quantity to existing
        return assetRepository.save(oldAsset);      // Saves and returns the updated asset
    }

    // Finds an asset by user ID and coin ID, may return null if not found
    @Override
    public Asset findAssetByUserIdAndCoinId(Long userId, String coinId) throws Exception {
        return assetRepository.findByUserIdAndCoinId(userId, coinId); // Returns the matching asset
    }

    // Deletes an asset by its ID
    public void deleteAsset(Long assetId) {
        assetRepository.deleteById(assetId);        // Removes the asset from the database
    }
}
