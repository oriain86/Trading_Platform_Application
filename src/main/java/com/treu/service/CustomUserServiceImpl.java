package com.treu.service;

// Entity class representing a user in the system
import com.treu.model.User;
// Repository interface for user data access
import com.treu.repository.UserRepository;
// Interface for representing granted authorities in Spring Security
import org.springframework.security.core.GrantedAuthority;
// Interface for user details in Spring Security
import org.springframework.security.core.userdetails.UserDetails;
// Interface for custom user details service in Spring Security
import org.springframework.security.core.userdetails.UserDetailsService;
// Exception thrown when a username is not found
import org.springframework.security.core.userdetails.UsernameNotFoundException;
// Spring annotation to mark this class as a service
import org.springframework.stereotype.Service;

import java.util.ArrayList;          // Dynamic array implementation for lists
import java.util.List;             // Interface for ordered collections

// Marks this class as a Spring service bean
@Service
public class CustomUserServiceImpl implements UserDetailsService {

    // Repository for accessing user data
    private UserRepository userRepository;

    // Constructor-based dependency injection of UserRepository
    public CustomUserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Loads user details by username (email) for Spring Security authentication
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Attempts to find a user by their email (used as username)
        User user = userRepository.findByEmail(username);

        // Checks if user exists, throws exception if not found
        if (user == null) {
            throw new UsernameNotFoundException("user not found with email  - " + username);
        }

        // Initializes an empty list of authorities (roles/permissions), currently not populated
        List<GrantedAuthority> authorities = new ArrayList<>();

        // Returns a Spring Security User object with email, password, and authorities
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(), user.getPassword(), authorities);
    }
}
