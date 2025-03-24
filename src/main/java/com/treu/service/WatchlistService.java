package com.treu.service;

// Entity class representing a cryptocurrency
import com.treu.model.Coin;
// Entity class representing a user
import com.treu.model.User;
// Entity class representing a watchlist
import com.treu.model.Watchlist;

// Defines a service interface for managing watchlist-related operations
public interface WatchlistService {

    // Retrieves a user's watchlist by their ID, throws an exception if not found or error occurs
    Watchlist findUserWatchlist(Long userId) throws Exception;

    // Creates a new watchlist for a specified user
    Watchlist createWatchList(User user);

    // Finds a watchlist by its ID, throws an exception if not found or error occurs
    Watchlist findById(Long id) throws Exception;

    // Adds a coin to a user's watchlist, throws an exception if operation fails
    Coin addItemToWatchlist(Coin coin, User user) throws Exception;
}
