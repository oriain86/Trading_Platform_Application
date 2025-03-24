package com.treu.controller;

import com.treu.exception.UserException;
import com.treu.model.Asset;
import com.treu.model.User;
import com.treu.service.AssetService;
import com.treu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Marks this class as a REST controller, handling HTTP requests under /api/assets
@RestController
@RequestMapping("/api/assets")
public class AssetController {
    // Service for handling asset-related business logic
    private final AssetService assetService;

    // Service for handling user-related business logic, injected via @Autowired
    @Autowired
    private UserService userService;

    // Constructor injection for AssetService (preferred over field injection)
    @Autowired
    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    // Handles GET requests to retrieve an asset by its ID
    @GetMapping("/{assetId}")
    public ResponseEntity<Asset> getAssetById(@PathVariable Long assetId) {
        // Fetches the asset using the provided assetId
        Asset asset = assetService.getAssetById(assetId);
        // Returns the asset in the response body with HTTP 200 (OK)
        return ResponseEntity.ok().body(asset);
    }

    // Handles GET requests to retrieve an asset by user ID (from JWT) and coin ID
    @GetMapping("/coin/{coinId}/user")
    public ResponseEntity<Asset> getAssetByUserIdAndCoinId(
            @PathVariable String coinId,              // Coin ID from the URL path
            @RequestHeader("Authorization") String jwt // JWT from the Authorization header
    ) throws Exception {
        // Retrieves the user associated with the JWT
        User user = userService.findUserProfileByJwt(jwt);
        // Fetches the asset for the user and coin ID
        Asset asset = assetService.findAssetByUserIdAndCoinId(user.getId(), coinId);
        // Returns the asset in the response body with HTTP 200 (OK)
        return ResponseEntity.ok().body(asset);
    }

    // Handles GET requests to retrieve all assets for a user (identified by JWT)
    @GetMapping()
    public ResponseEntity<List<Asset>> getAssetsForUser(
            @RequestHeader("Authorization") String jwt // JWT from the Authorization header
    ) throws UserException {
        // Retrieves the user associated with the JWT
        User user = userService.findUserProfileByJwt(jwt);
        // Fetches the list of assets for the user
        List<Asset> assets = assetService.getUsersAssets(user.getId());
        // Returns the list of assets in the response body with HTTP 200 (OK)
        return ResponseEntity.ok().body(assets);
    }
}
