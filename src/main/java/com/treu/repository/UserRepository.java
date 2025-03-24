package com.treu.repository;

// Entity class representing a user in the system
import com.treu.model.User;
// Spring Data JPAs repository interface providing CRUD operations
import org.springframework.data.jpa.repository.JpaRepository;

// Defines a repository interface for User entity management
public interface UserRepository extends JpaRepository<User, Long> {

    // Retrieves a user by their email address
    public User findByEmail(String email);
}