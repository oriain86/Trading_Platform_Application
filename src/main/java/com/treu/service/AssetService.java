package com.treu.service;

// Entity class representing an asset in the system
import com.treu.model.Asset;
// Entity class representing a cryptocurrency in the system
import com.treu.model.Coin;
// Entity class representing a user in the system
import com.treu.model.User;

import java.util.List;             // Interface for ordered collections

// Defines a service interface for managing asset-related operations
public interface AssetService {
    // Creates a new asset for a user with the specified coin and quantity
    Asset createAsset(User user, Coin coin, double quantity);

    // Retrieves an asset by its unique ID
    Asset getAssetById(Long assetId);

    // Retrieves an asset by both user ID and asset ID
    Asset getAssetByUserAndId(Long userId, Long assetId);

    // Retrieves all assets associated with a specific user
    List<Asset> getUsersAssets(Long userId);

    // Updates an existing asset's quantity, throws an exception if the operation fails
    Asset updateAsset(Long assetId, double quantity) throws Exception;

    // Finds an asset by user ID and coin ID, throws an exception if not found or invalid
    Asset findAssetByUserIdAndCoinId(Long userId, String coinId) throws Exception;

    // Deletes an asset by its ID
    void deleteAsset(Long assetId);
}
