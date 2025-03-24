package com.treu.service;

// Entity class representing a cryptocurrency
import com.treu.model.Coin;
// Entity class representing a user
import com.treu.model.User;
// Entity class representing a watchlist
import com.treu.model.Watchlist;
// Repository interface for watchlist data access
import com.treu.repository.WatchlistRepository;
// Spring annotation for dependency injection
import org.springframework.beans.factory.annotation.Autowired;
// Spring annotation to mark this class as a service
import org.springframework.stereotype.Service;

import java.util.Optional;        // Wrapper for handling nullable values

// Marks this class as a Spring service bean
@Service
public class WatchlistServiceImpl implements WatchlistService {

    // Repository for performing CRUD operations on Watchlist entities
    @Autowired
    private WatchlistRepository watchlistRepository;

    // Retrieves a user's watchlist by their ID, throws exception if not found
    @Override
    public Watchlist findUserWatchlist(Long userId) throws Exception {
        // Queries the repository for the watchlist by user ID
        Watchlist watchlist = watchlistRepository.findByUserId(userId);
        if (watchlist == null) {           // Checks if watchlist exists
            throw new Exception("watch not found"); // Throws exception if not found (likely meant "watchlist")
        }
        return watchlist;                  // Returns the found watchlist
    }

    // Creates a new watchlist for a specified user
    @Override
    public Watchlist createWatchList(User user) {
        Watchlist watchlist = new Watchlist(); // Creates a new Watchlist instance
        watchlist.setUser(user);               // Associates the watchlist with the user
        return watchlistRepository.save(watchlist); // Saves and returns the watchlist
    }

    // Finds a watchlist by its ID, throws exception if not found
    @Override
    public Watchlist findById(Long id) throws Exception {
        // Queries the repository for the watchlist by ID
        Optional<Watchlist> optionalWatchlist = watchlistRepository.findById(id);
        if (optionalWatchlist.isEmpty()) {     // Checks if watchlist exists
            throw new Exception("watch list not found"); // Throws exception if not found
        }
        return optionalWatchlist.get();        // Returns the found watchlist
    }

    // Adds or removes a coin from a user's watchlist, toggling its presence
    @Override
    public Coin addItemToWatchlist(Coin coin, User user) throws Exception {
        Watchlist watchlist = findUserWatchlist(user.getId()); // Retrieves user's watchlist

        // Toggles coin presence: removes if present, adds if absent
        if (watchlist.getCoins().contains(coin)) {
            watchlist.getCoins().remove(coin); // Removes coin from watchlist
        } else {
            watchlist.getCoins().add(coin);    // Adds coin to watchlist
        }
        watchlistRepository.save(watchlist);   // Saves the updated watchlist
        return coin;                           // Returns the coin (unchanged)
    }
}
