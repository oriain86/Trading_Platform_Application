package com.treu.service;

import com.treu.config.JwtProvider;
import com.treu.domain.VerificationType;
import com.treu.exception.UserException;
import com.treu.model.User;
import com.treu.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Test class for UserServiceImpl
 * Contains unit tests for all methods in the UserServiceImpl class
 */
@ExtendWith(MockitoExtension.class) // Use Mockito JUnit 5 extension for managing mocks
public class UserServiceImplTest {

    // Mock dependencies to isolate the unit tests
    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    // Inject mocks into the service being tested
    @InjectMocks
    private UserServiceImpl userService;

    // Test data constants
    private User testUser;
    private final String TEST_EMAIL = "test@example.com";
    private final String TEST_JWT = "test.jwt.token";
    private final Long TEST_USER_ID = 1L;

    /**
     * Set up test data before each test
     * Creates a test user with predefined values
     */
    @BeforeEach
    void setUp() {
        // Initialize a test user with common properties for all tests
        testUser = new User();
        testUser.setId(TEST_USER_ID);
        testUser.setEmail(TEST_EMAIL);
        testUser.setPassword("encodedPassword");
    }

    /**
     * Test for findUserProfileByJwt when user exists
     * Verifies that the method returns the correct user when JWT is valid
     */
    @Test
    void findUserProfileByJwt_Success() throws UserException {
        // Arrange: Set up mocks and expectations
        // Use MockedStatic to mock the static method JwtProvider.getEmailFromJwtToken
        try (MockedStatic<JwtProvider> jwtProviderMock = mockStatic(JwtProvider.class)) {
            // Configure the static method to return our test email when called with our test JWT
            jwtProviderMock.when(() -> JwtProvider.getEmailFromJwtToken(TEST_JWT)).thenReturn(TEST_EMAIL);
            // Configure the repository to return our test user when findByEmail is called
            when(userRepository.findByEmail(TEST_EMAIL)).thenReturn(testUser);

            // Act: Call the method being tested
            User result = userService.findUserProfileByJwt(TEST_JWT);

            // Assert: Verify the results
            assertNotNull(result, "User should not be null");
            assertEquals(TEST_EMAIL, result.getEmail(), "Email should match the test email");
            // Verify that findByEmail was called exactly once with the correct email
            verify(userRepository, times(1)).findByEmail(TEST_EMAIL);
        }
    }

    /**
     * Test for findUserProfileByJwt when user does not exist
     * Verifies that the method throws UserException with correct message
     */
    @Test
    void findUserProfileByJwt_UserNotFound() {
        // Arrange: Set up mocks and expectations for the failure case
        try (MockedStatic<JwtProvider> jwtProviderMock = mockStatic(JwtProvider.class)) {
            jwtProviderMock.when(() -> JwtProvider.getEmailFromJwtToken(TEST_JWT)).thenReturn(TEST_EMAIL);
            // Mock repository to return null, simulating user not found
            when(userRepository.findByEmail(TEST_EMAIL)).thenReturn(null);

            // Act & Assert: Verify that exception is thrown with correct message
            UserException exception = assertThrows(UserException.class, () -> {
                userService.findUserProfileByJwt(TEST_JWT);
            }, "Should throw UserException when user not found");

            // Verify that the exception message matches the expected message
            assertEquals("user not exist with email " + TEST_EMAIL, exception.getMessage(),
                    "Exception message should indicate user not found with correct email");
            // Verify the repository was called correctly
            verify(userRepository, times(1)).findByEmail(TEST_EMAIL);
        }
    }

    /**
     * Test for findUserByEmail when user exists
     * Verifies that the method returns the correct user for a given email
     */
    @Test
    void findUserByEmail_Success() throws UserException {
        // Arrange: Configure repository to return test user
        when(userRepository.findByEmail(TEST_EMAIL)).thenReturn(testUser);

        // Act: Call the method being tested
        User result = userService.findUserByEmail(TEST_EMAIL);

        // Assert: Verify the results and method calls
        assertNotNull(result, "User should not be null");
        assertEquals(TEST_EMAIL, result.getEmail(), "Email should match the test email");
        verify(userRepository, times(1)).findByEmail(TEST_EMAIL);
    }

    /**
     * Test for findUserByEmail when user does not exist
     * Verifies that the method throws UserException with correct message
     */
    @Test
    void findUserByEmail_UserNotFound() {
        // Arrange: Mock repository to return null for the email
        when(userRepository.findByEmail(TEST_EMAIL)).thenReturn(null);

        // Act & Assert: Verify exception is thrown with correct message
        UserException exception = assertThrows(UserException.class, () -> {
            userService.findUserByEmail(TEST_EMAIL);
        }, "Should throw UserException when user not found");

        // Verify exception message and repository call
        assertEquals("user not exist with username " + TEST_EMAIL, exception.getMessage(),
                "Exception message should indicate user not found with correct username");
        verify(userRepository, times(1)).findByEmail(TEST_EMAIL);
    }

    /**
     * Test for findUserById when user exists
     * Verifies that the method returns the correct user for a given ID
     */
    @Test
    void findUserById_Success() throws UserException {
        // Arrange: Configure repository to return an Optional containing the test user
        when(userRepository.findById(TEST_USER_ID)).thenReturn(Optional.of(testUser));

        // Act: Call the method being tested
        User result = userService.findUserById(TEST_USER_ID);

        // Assert: Verify results and repository call
        assertNotNull(result, "User should not be null");
        assertEquals(TEST_USER_ID, result.getId(), "User ID should match the test ID");
        verify(userRepository, times(1)).findById(TEST_USER_ID);
    }

    /**
     * Test for findUserById when user does not exist
     * Verifies that the method throws UserException with correct message
     */
    @Test
    void findUserById_UserNotFound() {
        // Arrange: Configure repository to return an empty Optional
        when(userRepository.findById(TEST_USER_ID)).thenReturn(Optional.empty());

        // Act & Assert: Verify exception is thrown with correct message
        UserException exception = assertThrows(UserException.class, () -> {
            userService.findUserById(TEST_USER_ID);
        }, "Should throw UserException when user not found");

        // Verify exception message and repository call
        assertEquals("user not found with id " + TEST_USER_ID, exception.getMessage(),
                "Exception message should indicate user not found with correct ID");
        verify(userRepository, times(1)).findById(TEST_USER_ID);
    }

    /**
     * Test for verifyUser
     * Verifies that the user's verified status is set to true and saved
     */
    @Test
    void verifyUser_Success() throws UserException {
        // Arrange: Configure repository to return the test user when save is called
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        // Act: Call the method being tested
        User result = userService.verifyUser(testUser);

        // Assert: Verify the user's verified status and repository call
        assertTrue(result.isVerified(), "User should be marked as verified");
        verify(userRepository, times(1)).save(testUser);
    }

    /**
     * Test for enabledTwoFactorAuthentication
     * Verifies that two-factor authentication is enabled with correct settings
     */
    @Test
    void enabledTwoFactorAuthentication_Success() throws UserException {
        // Arrange: Set up verification type and target
        VerificationType verificationType = VerificationType.EMAIL;
        String sendTo = TEST_EMAIL;

        // Configure repository to return the saved user object
        // Using answer to capture and return the actual saved user object
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User savedUser = invocation.getArgument(0);
            return savedUser;
        });

        // Act: Call the method being tested
        User result = userService.enabledTwoFactorAuthentication(verificationType, sendTo, testUser);

        // Assert: Verify two-factor authentication settings
        assertNotNull(result.getTwoFactorAuth(), "TwoFactorAuth object should not be null");
        assertTrue(result.getTwoFactorAuth().isEnabled(), "Two-factor authentication should be enabled");
        assertEquals(verificationType, result.getTwoFactorAuth().getSendTo(),
                "Verification type should match the provided type");
        verify(userRepository, times(1)).save(testUser);
    }

    /**
     * Test for updatePassword
     * Verifies that the password is encoded and updated correctly
     */
    @Test
    void updatePassword_Success() {
        // Arrange: Set up test data for password update
        String newPassword = "newPassword";
        String encodedPassword = "encodedNewPassword";

        // Configure mocks to return expected values
        when(passwordEncoder.encode(newPassword)).thenReturn(encodedPassword);
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        // Act: Call the method being tested
        User result = userService.updatePassword(testUser, newPassword);

        // Assert: Verify the password was updated correctly
        assertEquals(encodedPassword, result.getPassword(), "Password should be updated with encoded value");
        // Verify encoder and repository were called with correct arguments
        verify(passwordEncoder, times(1)).encode(newPassword);
        verify(userRepository, times(1)).save(testUser);
    }

    /**
     * Test for sendUpdatePasswordOtp
     * Verifies that the method doesn't throw exceptions (since it's currently unimplemented)
     */
    @Test
    void sendUpdatePasswordOtp_MethodCalled() {
        // Arrange: Set up test data
        String otp = "123456";

        // Act & Assert: Verify method doesn't throw exception
        // This method is currently empty in the implementation
        assertDoesNotThrow(() -> userService.sendUpdatePasswordOtp(TEST_EMAIL, otp),
                "Method should not throw any exceptions");
    }
}
