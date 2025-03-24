package com.treu.service;

// Custom enum for defining user roles (e.g., ROLE_USER, ROLE_ADMIN)
import com.treu.domain.USER_ROLE;
// Entity class representing a user in the system
import com.treu.model.User;
// Repository interface for user data access
import com.treu.repository.UserRepository;
// Spring annotation for dependency injection
import org.springframework.beans.factory.annotation.Autowired;
// Spring interface for running initialization logic at startup
import org.springframework.boot.CommandLineRunner;
// Spring interface for password encoding
import org.springframework.security.crypto.password.PasswordEncoder;
// Spring annotation to mark this class as a component
import org.springframework.stereotype.Component;

// Marks this class as a Spring component, automatically detected and instantiated
@Component
public class DataInitializationComponent implements CommandLineRunner {

    // Repository for accessing and saving user data
    private final UserRepository userRepository;

    // Password encoder for securing user passwords
    private PasswordEncoder passwordEncoder;

    // Constructor-based dependency injection of UserRepository and PasswordEncoder
    @Autowired
    public DataInitializationComponent(UserRepository userRepository,
                                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Runs initialization logic after the application context is loaded
    @Override
    public void run(String... args) {
        initializeAdminUser(); // Calls method to set up admin user
    }

    // Initializes an admin user if it doesn't already exist
    private void initializeAdminUser() {
        String adminUsername = "codewithzosh@gmail.com"; // Default admin email

        // Checks if admin user already exists in the database
        if (userRepository.findByEmail(adminUsername) == null) {
            User adminUser = new User(); // Creates a new User instance

            // Sets admin password, encoded for security
            adminUser.setPassword(passwordEncoder.encode("codewithzosh"));
            adminUser.setFullName("Code With Zosh"); // Sets admin full name
            adminUser.setEmail(adminUsername);       // Sets admin email
            adminUser.setRole(USER_ROLE.ROLE_ADMIN); // Assigns admin role

            // Saves the admin user to the database
            User admin = userRepository.save(adminUser);
        }
    }
}
