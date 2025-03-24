package com.treu.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.treu.config.JwtProvider;
import com.treu.model.TwoFactorAuth;
import com.treu.model.TwoFactorOTP;
import com.treu.model.User;
import com.treu.repository.UserRepository;
import com.treu.request.LoginRequest;
import com.treu.service.*;
import com.treu.utils.OtpUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Test class for AuthController.
 * Uses Mockito framework for mocking dependencies and JUnit 5 for running tests.
 * The tests focus on validating authentication flows including signup, login, and two-factor authentication.
 */
@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT) // Use lenient strictness to avoid argument mismatch issues
public class AuthControllerTest {

    // MockMvc is used to perform HTTP requests in our tests without starting a real server
    private MockMvc mockMvc;

    // Mock all the dependencies of AuthController
    @Mock
    private UserRepository userRepository;

    @Mock
    private CustomUserServiceImpl customUserDetails;

    @Mock
    private UserService userService;

    @Mock
    private WatchlistService watchlistService;

    @Mock
    private WalletService walletService;

    @Mock
    private VerificationService verificationService;

    @Mock
    private TwoFactorOtpService twoFactorOtpService;

    @Mock
    private EmailService emailService;

    @Mock
    private PasswordEncoder passwordEncoder;

    // Inject our mocks into the AuthController class
    @InjectMocks
    private AuthController authController;

    // ObjectMapper to convert Java objects to JSON and vice versa
    private ObjectMapper objectMapper = new ObjectMapper();

    // Test user that will be used in several tests
    private User testUser;

    /**
     * Set up method executed before each test.
     * Initializes mock behavior and test data.
     */
    @BeforeEach
    void setUp() {
        // Setup password encoder to return a fixed encoded password for any input string
        // This is important because multiple components try to encode passwords with various inputs
        doAnswer(invocation -> {
            String arg = invocation.getArgument(0);
            System.out.println("passwordEncoder.encode() called with: " + arg);
            return "encodedPassword";
        }).when(passwordEncoder).encode(anyString());

        // Create a standalone MockMvc instance for testing controllers
        // This doesn't start a full Spring context but allows testing the controller in isolation
        mockMvc = MockMvcBuilders.standaloneSetup(authController).build();

        // Create a test user with standard attributes for testing
        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("test@example.com");
        testUser.setPassword("encodedPassword"); // Already encoded password
        testUser.setFullName("Test User");

        // Initialize a default TwoFactorAuth object (not enabled by default)
        testUser.setTwoFactorAuth(new TwoFactorAuth());
    }

    /**
     * Test for successful user registration.
     * Verifies that a valid user registration request creates a user and returns the expected response.
     */
    @Test
    void signup_validUser_returnsAuthResponse() throws Exception {
        // Arrange:
        // Create a sample user for the registration request
        User newUser = new User();
        newUser.setEmail("new@example.com");
        newUser.setPassword("password"); // Plain password that should be encoded
        newUser.setFullName("New User");
        newUser.setMobile("1234567890");

        // Mock repository to return null when checking if email exists (meaning it's available)
        when(userRepository.findByEmail("new@example.com")).thenReturn(null);

        // Mock repository to return the saved user when save is called
        when(userRepository.save(any(User.class))).thenReturn(newUser);

        // Use MockedStatic to mock the static JwtProvider.generateToken method
        // This is necessary because JwtProvider uses static methods for token operations
        try (MockedStatic<JwtProvider> jwtProviderMock = Mockito.mockStatic(JwtProvider.class)) {
            // Configure the mock to return a predefined JWT token when generateToken is called
            jwtProviderMock.when(() -> JwtProvider.generateToken(any()))
                    .thenReturn("test.jwt.token");

            // Act & Assert:
            // Perform a POST request to the signup endpoint with the new user JSON
            // Verify that the response status is OK (200) and contains expected JWT and message
            mockMvc.perform(post("/auth/signup")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(newUser)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.jwt").value("test.jwt.token"))
                    .andExpect(jsonPath("$.message").value("Register Success"));
        }
    }

    /**
     * Test for successful user login.
     * Verifies that a valid login request with correct credentials returns the expected response.
     */
    @Test
    void signin_validCredentials_returnsAuthResponse() throws Exception {
        // Arrange:
        // Create a login request with test credentials
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password");

        // Create a Spring Security UserDetails object representing the authenticated user
        // This is what loadUserByUsername should return when the service finds a user
        UserDetails userDetails = org.springframework.security.core.userdetails.User
                .withUsername("test@example.com")
                .password("encodedPassword")
                .authorities(new ArrayList<>()) // Empty authorities list for simplicity
                .build();

        // Mock behavior for authentication:
        // 1. Return UserDetails when loadUserByUsername is called
        when(customUserDetails.loadUserByUsername("test@example.com")).thenReturn(userDetails);

        // 2. Return true when password matching is checked
        when(passwordEncoder.matches("password", "encodedPassword")).thenReturn(true);

        // 3. Return our test user when finding a user by email
        when(userService.findUserByEmail("test@example.com")).thenReturn(testUser);

        // Use MockedStatic to mock the static JwtProvider.generateToken method
        try (MockedStatic<JwtProvider> jwtProviderMock = Mockito.mockStatic(JwtProvider.class)) {
            // Configure the mock to return a predefined JWT token
            jwtProviderMock.when(() -> JwtProvider.generateToken(any()))
                    .thenReturn("test.jwt.token");

            // Act & Assert:
            // Perform a POST request to the signin endpoint with the login credentials
            // Verify response contains expected JWT and success message
            mockMvc.perform(post("/auth/signin")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(loginRequest)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.jwt").value("test.jwt.token"))
                    .andExpect(jsonPath("$.message").value("Login Success"));
        }
    }

    /**
     * Test for login with two-factor authentication enabled.
     * Verifies that when 2FA is enabled, the response contains a session ID but no JWT.
     */
    @Test
    void signin_withTwoFactorAuth_returnsSessionInfo() throws Exception {
        // Arrange:
        // Create login request with test credentials
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password");

        // Enable two-factor authentication for the test user
        testUser.getTwoFactorAuth().setEnabled(true);

        // Create a mock TwoFactorOTP object representing the OTP session created during login
        TwoFactorOTP twoFactorOTP = new TwoFactorOTP();
        twoFactorOTP.setId("session123"); // Session ID that should be returned to the client
        twoFactorOTP.setOtp("123456");    // OTP that should be sent to the user
        twoFactorOTP.setUser(testUser);
        twoFactorOTP.setJwt("test.jwt.token"); // JWT that will be issued after OTP verification

        // Create UserDetails object for authentication
        UserDetails userDetails = org.springframework.security.core.userdetails.User
                .withUsername("test@example.com")
                .password("encodedPassword")
                .authorities(new ArrayList<>())
                .build();

        // Mock service behavior:
        // 1. Return UserDetails for authentication
        when(customUserDetails.loadUserByUsername("test@example.com")).thenReturn(userDetails);

        // 2. Return true for password matching
        when(passwordEncoder.matches("password", "encodedPassword")).thenReturn(true);

        // 3. Return test user when finding by email
        when(userService.findUserByEmail("test@example.com")).thenReturn(testUser);

        // 4. Return null when checking for existing OTP (indicating no OTP exists yet)
        when(twoFactorOtpService.findByUser(testUser.getId())).thenReturn(null);

        // 5. Return our mock OTP object when creating a new OTP
        when(twoFactorOtpService.createTwoFactorOtp(eq(testUser), anyString(), anyString()))
                .thenReturn(twoFactorOTP);

        // Use MockedStatic for both OtpUtils and JwtProvider static methods
        try (MockedStatic<OtpUtils> otpUtilsMock = Mockito.mockStatic(OtpUtils.class)) {
            // Mock OTP generation to return a fixed value
            otpUtilsMock.when(OtpUtils::generateOTP).thenReturn("123456");

            try (MockedStatic<JwtProvider> jwtProviderMock = Mockito.mockStatic(JwtProvider.class)) {
                // Mock JWT generation
                jwtProviderMock.when(() -> JwtProvider.generateToken(any()))
                        .thenReturn("test.jwt.token");

                // Act & Assert:
                // Perform login request and verify the response indicates 2FA is required
                mockMvc.perform(post("/auth/signin")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(loginRequest)))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.twoFactorAuthEnabled").value(true))
                        .andExpect(jsonPath("$.session").value("session123"))
                        .andExpect(jsonPath("$.message").value("Two factor authentication enabled"));
            }
        }
    }

    /**
     * Test for successful OTP verification in two-factor authentication.
     * Verifies that providing a valid OTP returns the JWT token.
     */
    @Test
    void verifyOtp_validOtp_returnsTokenResponse() throws Exception {
        // Arrange:
        // Define OTP value and session ID for the test
        String otpValue = "123456";
        String sessionId = "session123";

        // Create a mock TwoFactorOTP representing a stored OTP session
        TwoFactorOTP twoFactorOTP = new TwoFactorOTP();
        twoFactorOTP.setId(sessionId);
        twoFactorOTP.setOtp(otpValue);
        twoFactorOTP.setUser(testUser);
        twoFactorOTP.setJwt("test.jwt.token"); // The JWT that should be returned after verification

        // Mock service behavior:
        // 1. Return the mock OTP object when looking up by session ID
        when(twoFactorOtpService.findById(sessionId)).thenReturn(twoFactorOTP);

        // 2. Return true when verifying the OTP (indicating OTP is valid)
        when(twoFactorOtpService.verifyTwoFactorOtp(twoFactorOTP, otpValue)).thenReturn(true);

        // Act & Assert:
        // Perform request to verify OTP with the given OTP value and session ID
        // Verify the response contains the JWT token and indicates 2FA is completed
        mockMvc.perform(post("/auth/two-factor/otp/" + otpValue)
                        .param("id", sessionId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.jwt").value("test.jwt.token"))
                .andExpect(jsonPath("$.twoFactorAuthEnabled").value(true))
                .andExpect(jsonPath("$.message").value("Two factor authentication verified"));
    }
}
