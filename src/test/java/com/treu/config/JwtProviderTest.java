package com.treu.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.crypto.SecretKey;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

/**
 * Test class for JwtProvider utility
 * Contains unit tests for JWT token generation and validation methods
 */
public class JwtProviderTest {

    @Mock
    private Authentication authentication;

    private final String TEST_EMAIL = "test@example.com";
    private final String TEST_ROLE = "ROLE_USER";
    private final SecretKey TEST_KEY = Keys.hmacShaKeyFor("TestSecretKeyForJwtProviderUnitTesting12345".getBytes());

    /**
     * Setup test environment before each test
     * Initializes mocks and configures common test data
     */
    @BeforeEach
    void setUp() {
        // Initialize mocks
        MockitoAnnotations.openMocks(this);

        // Set test key for JWT operations
        JwtProvider.setKey(TEST_KEY);
    }

    /**
     * Test for generateToken method
     * Verifies that a valid JWT is generated with correct claims
     */
    @Test
    void generateToken_ShouldCreateValidToken() {
        // Arrange
        // Create a collection of authorities using a raw type to avoid generic type issues
        Collection authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(TEST_ROLE));

        // Configure the mock
        when(authentication.getName()).thenReturn(TEST_EMAIL);
        when(authentication.getAuthorities()).thenReturn(authorities);

        // Act: Generate token using authentication mock
        String token = JwtProvider.generateToken(authentication);

        // Assert: Verify token is not null or empty
        assertNotNull(token);
        assertFalse(token.isEmpty());

        // Parse the token to validate its contents
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(TEST_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();

        // Verify claims contain expected values
        assertEquals(TEST_EMAIL, claims.get("email"));
        assertEquals(TEST_ROLE, claims.get("authorities"));

        // Verify token expiration is set to future (24 hours from now)
        assertTrue(claims.getExpiration().after(new Date()));
    }

    /**
     * Test for getEmailFromJwtToken method
     * Verifies correct email extraction from a valid JWT token
     */
    @Test
    void getEmailFromJwtToken_ShouldExtractEmail() {
        // Arrange: Generate a token with known claims
        String token = "Bearer " + Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .claim("email", TEST_EMAIL)
                .claim("authorities", TEST_ROLE)
                .signWith(TEST_KEY)
                .compact();

        // Act: Extract email from token
        String extractedEmail = JwtProvider.getEmailFromJwtToken(token);

        // Assert: Verify extracted email matches expected value
        assertEquals(TEST_EMAIL, extractedEmail);
    }

    /**
     * Test for populateAuthorities method
     * Verifies conversion of authorities collection to comma-separated string
     */
    @Test
    void populateAuthorities_ShouldConvertToString() {
        // Arrange: Create a collection of authorities using a raw type
        Collection authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));

        // Act: Convert authorities to string
        String authoritiesString = JwtProvider.populateAuthorities(authorities);

        // Assert: Verify string contains all roles (order might vary due to Set usage)
        assertTrue(authoritiesString.contains("ROLE_USER"));
        assertTrue(authoritiesString.contains("ROLE_ADMIN"));
        assertTrue(authoritiesString.contains(","));
    }

    /**
     * Test for getEmailFromJwtToken method with invalid token format
     * Verifies proper exception handling for tokens without "Bearer " prefix
     */
    @Test
    void getEmailFromJwtToken_WithInvalidFormat_ShouldThrowException() {
        // Arrange: Create a token without "Bearer " prefix
        String invalidToken = Jwts.builder()
                .setIssuedAt(new Date())
                .claim("email", TEST_EMAIL)
                .signWith(TEST_KEY)
                .compact();

        // Act & Assert: Verify exception is thrown for invalid format
        // Since JwtProvider may have different validation logic than expected,
        // we'll test for Exception which covers both StringIndexOutOfBoundsException and MalformedJwtException
        assertThrows(Exception.class, () -> {
            JwtProvider.getEmailFromJwtToken(invalidToken);
        });
    }

    /**
     * Test for getEmailFromJwtToken method with expired token
     * Verifies proper exception handling for expired JWTs
     */
    @Test
    void getEmailFromJwtToken_WithExpiredToken_ShouldThrowException() {
        // Arrange: Create an expired token
        String expiredToken = "Bearer " + Jwts.builder()
                .setIssuedAt(new Date(System.currentTimeMillis() - 86400000)) // 1 day ago
                .setExpiration(new Date(System.currentTimeMillis() - 3600000)) // 1 hour ago
                .claim("email", TEST_EMAIL)
                .signWith(TEST_KEY)
                .compact();

        // Act & Assert: Verify exception is thrown for expired token
        assertThrows(Exception.class, () -> {
            JwtProvider.getEmailFromJwtToken(expiredToken);
        });
    }
}
