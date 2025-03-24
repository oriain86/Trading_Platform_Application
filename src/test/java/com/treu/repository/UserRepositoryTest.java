package com.treu.repository;

import com.treu.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    // Helper method to create a test user
    private User createTestUser(String email) {
        User user = new User();
        user.setEmail(email);
        // Add any other required fields for User
        user.setPassword("password123");
        return user;
    }

    @Test
    public void testSaveUser() {
        // Create a new user
        User user = createTestUser("test@example.com");

        // Save the user
        User savedUser = userRepository.save(user);

        // Verify the user was saved with an ID
        assertNotNull(savedUser.getId());
        assertEquals("test@example.com", savedUser.getEmail());
    }

    @Test
    public void testFindById() {
        // Create and persist a user
        User user = createTestUser("findbyid@example.com");
        User persistedUser = entityManager.persistAndFlush(user);

        // Find the user by ID
        Optional<User> foundUser = userRepository.findById(persistedUser.getId());

        // Verify the user was found
        assertTrue(foundUser.isPresent());
        assertEquals(persistedUser.getId(), foundUser.get().getId());
        assertEquals("findbyid@example.com", foundUser.get().getEmail());
    }

    @Test
    public void testFindByEmail() {
        // Create and persist a user
        User user = createTestUser("findemail@example.com");
        entityManager.persistAndFlush(user);

        // Find the user by email
        User foundUser = userRepository.findByEmail("findemail@example.com");

        // Verify the user was found
        assertNotNull(foundUser);
        assertEquals("findemail@example.com", foundUser.getEmail());
    }

    @Test
    public void testFindByEmailNotFound() {
        // Try to find a user with an email that doesn't exist
        User foundUser = userRepository.findByEmail("nonexistent@example.com");

        // Verify no user was found
        assertNull(foundUser);
    }

    @Test
    public void testFindAll() {
        // Clear existing data
        userRepository.deleteAll();

        // Create and persist multiple users
        User user1 = createTestUser("user1@example.com");
        User user2 = createTestUser("user2@example.com");
        entityManager.persist(user1);
        entityManager.persist(user2);
        entityManager.flush();

        // Find all users
        List<User> allUsers = userRepository.findAll();

        // Verify all users were found
        assertEquals(2, allUsers.size());
    }

    @Test
    public void testUpdateUser() {
        // Create and persist a user
        User user = createTestUser("update@example.com");
        User persistedUser = entityManager.persistAndFlush(user);

        // Update the user
        persistedUser.setEmail("updated-email@example.com");
        userRepository.save(persistedUser);

        // Find the user again
        User updatedUser = entityManager.find(User.class, persistedUser.getId());

        // Verify the user was updated
        assertEquals("updated-email@example.com", updatedUser.getEmail());
    }

    @Test
    public void testDeleteUser() {
        // Create and persist a user
        User user = createTestUser("delete@example.com");
        User persistedUser = entityManager.persistAndFlush(user);

        // Delete the user
        userRepository.delete(persistedUser);

        // Try to find the deleted user
        User deletedUser = entityManager.find(User.class, persistedUser.getId());

        // Verify the user was deleted
        assertNull(deletedUser);
    }

    @Test
    public void testDeleteById() {
        // Create and persist a user
        User user = createTestUser("deletebyid@example.com");
        User persistedUser = entityManager.persistAndFlush(user);

        // Delete the user by ID
        userRepository.deleteById(persistedUser.getId());

        // Try to find the deleted user
        User deletedUser = entityManager.find(User.class, persistedUser.getId());

        // Verify the user was deleted
        assertNull(deletedUser);
    }

    @Test
    public void testExistsByIdTrue() {
        // Create and persist a user
        User user = createTestUser("exists@example.com");
        User persistedUser = entityManager.persistAndFlush(user);

        // Check if the user exists
        boolean exists = userRepository.existsById(persistedUser.getId());

        // Verify the user exists
        assertTrue(exists);
    }

    @Test
    public void testExistsByIdFalse() {
        // Check if a non-existent user exists
        boolean exists = userRepository.existsById(999L);

        // Verify the user doesn't exist
        assertFalse(exists);
    }

    @Test
    public void testCount() {
        // Clear existing data
        userRepository.deleteAll();

        // Create and persist multiple users
        User user1 = createTestUser("count1@example.com");
        User user2 = createTestUser("count2@example.com");
        entityManager.persist(user1);
        entityManager.persist(user2);
        entityManager.flush();

        // Count all users
        long count = userRepository.count();

        // Verify the count
        assertEquals(2, count);
    }
}
