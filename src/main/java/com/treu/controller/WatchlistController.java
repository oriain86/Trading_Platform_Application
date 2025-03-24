package com.treu.controller;

import com.treu.exception.UserException;
import com.treu.model.Coin;
import com.treu.model.User;
import com.treu.model.Watchlist;
import com.treu.service.CoinService;
import com.treu.service.UserService;
import com.treu.service.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Marks this class as a REST controller, handling watchlist-related requests under /api/watchlist
@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {

    // Service for handling watchlist operations, injected via constructor
    private final WatchlistService watchlistService;

    // Service for handling user operations, injected via constructor
    private final UserService userService;

    // Service for handling coin operations, injected via @Autowired
    @Autowired
    private CoinService coinService;

    // Constructor injection for WatchlistService and UserService
    @Autowired
    public WatchlistController(WatchlistService watchlistService, UserService userService) {
        this.watchlistService = watchlistService;
        this.userService = userService;
    }

    // Handles GET requests to retrieve the authenticated user's watchlist
    @GetMapping("/user")
    public ResponseEntity<Watchlist> getUserWatchlist(
            @RequestHeader("Authorization") String jwt) throws Exception {
        // Retrieves the user associated with the JWT
        User user = userService.findUserProfileByJwt(jwt);
        // Fetches the user's watchlist by their ID
        Watchlist watchlist = watchlistService.findUserWatchlist(user.getId());
        // Returns the watchlist with HTTP 200 (OK)
        return ResponseEntity.ok(watchlist);
    }

    // Handles POST requests to create a new watchlist for the authenticated user
    @PostMapping("/create")
    public ResponseEntity<Watchlist> createWatchlist(
            @RequestHeader("Authorization") String jwt) throws UserException {
        // Retrieves the user associated with the JWT
        User user = userService.findUserProfileByJwt(jwt);
        // Creates a new watchlist for the user
        Watchlist createdWatchlist = watchlistService.createWatchList(user);
        // Returns the created watchlist with HTTP 201 (Created)
        return ResponseEntity.status(HttpStatus.CREATED).body(createdWatchlist);
    }

    // Handles GET requests to retrieve a watchlist by its ID
    @GetMapping("/{watchlistId}")
    public ResponseEntity<Watchlist> getWatchlistById(
            @PathVariable Long watchlistId) throws Exception {
        // Fetches the watchlist by its ID
        Watchlist watchlist = watchlistService.findById(watchlistId);
        // Returns the watchlist with HTTP 200 (OK)
        return ResponseEntity.ok(watchlist);
    }

    // Handles PATCH requests to add a coin to the authenticated user's watchlist
    @PatchMapping("/add/coin/{coinId}")
    public ResponseEntity<Coin> addItemToWatchlist(
            @RequestHeader("Authorization") String jwt,
            @PathVariable String coinId) throws Exception {
        // Retrieves the user associated with the JWT
        User user = userService.findUserProfileByJwt(jwt);
        // Fetches the coin by its ID
        Coin coin = coinService.findById(coinId);
        // Adds the coin to the user's watchlist and returns the added coin
        Coin addedCoin = watchlistService.addItemToWatchlist(coin, user);
        // Returns the added coin with HTTP 200 (OK)
        return ResponseEntity.ok(addedCoin);
    }
}
