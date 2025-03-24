package com.treu.controller;

import com.treu.domain.VerificationType;
import com.treu.exception.UserException;
import com.treu.model.ForgotPasswordToken;
import com.treu.model.TwoFactorAuth;
import com.treu.model.User;
import com.treu.model.VerificationCode;
import com.treu.request.ResetPasswordRequest;
import com.treu.request.UpdatePasswordRequest;
import com.treu.response.ApiResponse;
import com.treu.response.AuthResponse;
import com.treu.service.EmailService;
import com.treu.service.ForgotPasswordService;
import com.treu.service.UserService;
import com.treu.service.VerificationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

/**
 * Test class for UserController
 * Contains unit tests for user-related API endpoints
 */
@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private VerificationService verificationService;

    @Mock
    private ForgotPasswordService forgotPasswordService;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private UserController userController;

    private User testUser;
    private VerificationCode testVerificationCode;
    private ForgotPasswordToken testForgotPasswordToken;
    private final String TEST_JWT = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIn0.signature";
    private final String TEST_EMAIL = "test@example.com";
    private final String TEST_OTP = "123456";

    /**
     * Setup test data before each test
     */
    @BeforeEach
    void setUp() {
        // Initialize test user
        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail(TEST_EMAIL);
        testUser.setPassword("encodedPassword");
        testUser.setVerified(false);

        // Initialize test verification code
        testVerificationCode = new VerificationCode();
        testVerificationCode.setId(1L);
        testVerificationCode.setUser(testUser);
        testVerificationCode.setOtp(TEST_OTP);
        testVerificationCode.setVerificationType(VerificationType.EMAIL);
        testVerificationCode.setEmail(TEST_EMAIL);

        // Initialize test forgot password token
        testForgotPasswordToken = new ForgotPasswordToken();
        testForgotPasswordToken.setId("unique-id");
        testForgotPasswordToken.setUser(testUser);
        testForgotPasswordToken.setOtp(TEST_OTP);
        testForgotPasswordToken.setVerificationType(VerificationType.EMAIL);
        testForgotPasswordToken.setEmail(TEST_EMAIL);
    }

    /**
     * Test for getUserProfileHandler method
     * Verifies user profile is correctly returned without password
     */
    @Test
    void getUserProfileHandler_ShouldReturnUserWithoutPassword() throws UserException {
        // Arrange
        when(userService.findUserProfileByJwt(TEST_JWT)).thenReturn(testUser);

        // Act
        ResponseEntity<User> response = userController.getUserProfileHandler(TEST_JWT);

        // Assert
        assertEquals(HttpStatus.ACCEPTED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertNull(response.getBody().getPassword());
        assertEquals(TEST_EMAIL, response.getBody().getEmail());

        // Verify service was called with correct JWT
        verify(userService).findUserProfileByJwt(TEST_JWT);
    }

    /**
     * Test for findUserById method
     * Verifies user is correctly returned by ID
     */
    @Test
    void findUserById_ShouldReturnUser() throws UserException {
        // Arrange
        when(userService.findUserById(1L)).thenReturn(testUser);

        // Act
        ResponseEntity<User> response = userController.findUserById(1L, TEST_JWT);

        // Assert
        assertEquals(HttpStatus.ACCEPTED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertNull(response.getBody().getPassword());
        assertEquals(1L, response.getBody().getId());

        // Verify service was called with correct ID
        verify(userService).findUserById(1L);
    }

    /**
     * Test for findUserByEmail method
     * Verifies user is correctly returned by email
     */
    @Test
    void findUserByEmail_ShouldReturnUser() throws UserException {
        // Arrange
        when(userService.findUserByEmail(TEST_EMAIL)).thenReturn(testUser);

        // Act
        ResponseEntity<User> response = userController.findUserByEmail(TEST_EMAIL, TEST_JWT);

        // Assert
        assertEquals(HttpStatus.ACCEPTED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(TEST_EMAIL, response.getBody().getEmail());

        // Verify service was called with correct email
        verify(userService).findUserByEmail(TEST_EMAIL);
    }

    /**
     * Test for enabledTwoFactorAuthentication method
     * Verifies successful 2FA enablement with valid OTP
     */
    @Test
    void enabledTwoFactorAuthentication_WithValidOtp_ShouldEnableTwoFactor() throws Exception {
        // Arrange
        when(userService.findUserProfileByJwt(TEST_JWT)).thenReturn(testUser);
        when(verificationService.findUsersVerification(testUser)).thenReturn(testVerificationCode);
        when(verificationService.VerifyOtp(TEST_OTP, testVerificationCode)).thenReturn(true);

        // Setup user with enabled 2FA
        User updatedUser = new User();
        updatedUser.setId(1L);
        updatedUser.setEmail(TEST_EMAIL);
        TwoFactorAuth twoFactorAuth = new TwoFactorAuth();
        twoFactorAuth.setEnabled(true);
        twoFactorAuth.setSendTo(VerificationType.EMAIL);
        updatedUser.setTwoFactorAuth(twoFactorAuth);

        when(userService.enabledTwoFactorAuthentication(
                eq(VerificationType.EMAIL), eq(TEST_EMAIL), eq(testUser))).thenReturn(updatedUser);
        doNothing().when(verificationService).deleteVerification(testVerificationCode);

        // Act
        ResponseEntity<User> response = userController.enabledTwoFactorAuthentication(TEST_JWT, TEST_OTP);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertNotNull(response.getBody().getTwoFactorAuth());
        assertTrue(response.getBody().getTwoFactorAuth().isEnabled());
        assertEquals(VerificationType.EMAIL, response.getBody().getTwoFactorAuth().getSendTo());

        // Verify service interactions
        verify(userService).findUserProfileByJwt(TEST_JWT);
        verify(verificationService).findUsersVerification(testUser);
        verify(verificationService).VerifyOtp(TEST_OTP, testVerificationCode);
        verify(userService).enabledTwoFactorAuthentication(
                VerificationType.EMAIL, TEST_EMAIL, testUser);
        verify(verificationService).deleteVerification(testVerificationCode);
    }

    /**
     * Test for enabledTwoFactorAuthentication method with invalid OTP
     * Verifies exception is thrown for invalid OTP
     */
    @Test
    void enabledTwoFactorAuthentication_WithInvalidOtp_ShouldThrowException() throws Exception {
        // Arrange
        when(userService.findUserProfileByJwt(TEST_JWT)).thenReturn(testUser);
        when(verificationService.findUsersVerification(testUser)).thenReturn(testVerificationCode);
        when(verificationService.VerifyOtp(TEST_OTP, testVerificationCode)).thenReturn(false);

        // Act & Assert
        Exception exception = assertThrows(Exception.class, () -> {
            userController.enabledTwoFactorAuthentication(TEST_JWT, TEST_OTP);
        });

        assertEquals("wrong otp", exception.getMessage());

        // Verify service interactions
        verify(userService).findUserProfileByJwt(TEST_JWT);
        verify(verificationService).findUsersVerification(testUser);
        verify(verificationService).VerifyOtp(TEST_OTP, testVerificationCode);
        verify(userService, never()).enabledTwoFactorAuthentication(any(), any(), any());
    }

    /**
     * Test for resetPassword method with valid OTP
     * Verifies password reset is processed with valid token and OTP
     */
    @Test
    void resetPassword_WithValidOtp_ShouldResetPassword() throws Exception {
        // Arrange
        String tokenId = "unique-id";
        ResetPasswordRequest request = new ResetPasswordRequest();
        request.setOtp(TEST_OTP);
        request.setPassword("newPassword");

        when(forgotPasswordService.findById(tokenId)).thenReturn(testForgotPasswordToken);
        when(forgotPasswordService.verifyToken(testForgotPasswordToken, TEST_OTP)).thenReturn(true);
        when(userService.updatePassword(testForgotPasswordToken.getUser(), "newPassword"))
                .thenReturn(testUser);

        // Act
        ResponseEntity<ApiResponse> response = userController.resetPassword(tokenId, request);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("password updated successfully", response.getBody().getMessage());

        // Verify service interactions
        verify(forgotPasswordService).findById(tokenId);
        verify(forgotPasswordService).verifyToken(testForgotPasswordToken, TEST_OTP);
        verify(userService).updatePassword(testForgotPasswordToken.getUser(), "newPassword");
    }

    /**
     * Test for resetPassword method with invalid OTP
     * Verifies exception is thrown for invalid OTP
     */
    @Test
    void resetPassword_WithInvalidOtp_ShouldThrowException() throws Exception {
        // Arrange
        String tokenId = "unique-id";
        ResetPasswordRequest request = new ResetPasswordRequest();
        request.setOtp(TEST_OTP);
        request.setPassword("newPassword");

        when(forgotPasswordService.findById(tokenId)).thenReturn(testForgotPasswordToken);
        when(forgotPasswordService.verifyToken(testForgotPasswordToken, TEST_OTP)).thenReturn(false);

        // Act & Assert
        Exception exception = assertThrows(Exception.class, () -> {
            userController.resetPassword(tokenId, request);
        });

        assertEquals("wrong otp", exception.getMessage());

        // Verify service interactions
        verify(forgotPasswordService).findById(tokenId);
        verify(forgotPasswordService).verifyToken(testForgotPasswordToken, TEST_OTP);
        verify(userService, never()).updatePassword(any(), any());
    }

    /**
     * Test for sendUpdatePasswordOTP method
     * Verifies OTP is sent for password reset
     */
    @Test
    void sendUpdatePasswordOTP_ShouldCreateTokenAndSendEmail() throws Exception {
        // Arrange
        UpdatePasswordRequest request = new UpdatePasswordRequest();
        request.setSendTo(TEST_EMAIL);
        request.setVerificationType(VerificationType.EMAIL);

        when(userService.findUserByEmail(TEST_EMAIL)).thenReturn(testUser);
        when(forgotPasswordService.findByUser(testUser.getId())).thenReturn(null);
        when(forgotPasswordService.createToken(
                eq(testUser), anyString(), anyString(), eq(VerificationType.EMAIL), eq(TEST_EMAIL)))
                .thenReturn(testForgotPasswordToken);
        doNothing().when(emailService).sendVerificationOtpEmail(TEST_EMAIL, TEST_OTP);

        // Act
        ResponseEntity<AuthResponse> response = userController.sendUpdatePasswordOTP(request);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(testForgotPasswordToken.getId(), response.getBody().getSession());
        assertEquals("Password Reset OTP sent successfully.", response.getBody().getMessage());

        // Verify service interactions
        verify(userService).findUserByEmail(TEST_EMAIL);
        verify(forgotPasswordService).findByUser(testUser.getId());
        verify(forgotPasswordService).createToken(
                eq(testUser), anyString(), anyString(), eq(VerificationType.EMAIL), eq(TEST_EMAIL));
        verify(emailService).sendVerificationOtpEmail(TEST_EMAIL, TEST_OTP);
    }

    /**
     * Test for verifyOTP method with valid OTP
     * Verifies user account verification with valid OTP
     */
    @Test
    void verifyOTP_WithValidOtp_ShouldVerifyUser() throws Exception {
        // Arrange
        when(userService.findUserProfileByJwt(TEST_JWT)).thenReturn(testUser);
        when(verificationService.findUsersVerification(testUser)).thenReturn(testVerificationCode);
        when(verificationService.VerifyOtp(TEST_OTP, testVerificationCode)).thenReturn(true);

        User verifiedUser = new User();
        verifiedUser.setId(1L);
        verifiedUser.setEmail(TEST_EMAIL);
        verifiedUser.setVerified(true);

        when(userService.verifyUser(testUser)).thenReturn(verifiedUser);
        doNothing().when(verificationService).deleteVerification(testVerificationCode);

        // Act
        ResponseEntity<User> response = userController.verifyOTP(TEST_JWT, TEST_OTP);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isVerified());

        // Verify service interactions
        verify(userService).findUserProfileByJwt(TEST_JWT);
        verify(verificationService).findUsersVerification(testUser);
        verify(verificationService).VerifyOtp(TEST_OTP, testVerificationCode);
        verify(verificationService).deleteVerification(testVerificationCode);
        verify(userService).verifyUser(testUser);
    }

    /**
     * Test for sendVerificationOTP method
     * Verifies OTP is sent for user verification
     */
    @Test
    void sendVerificationOTP_ShouldCreateAndSendOtp() throws Exception {
        // Arrange
        when(userService.findUserProfileByJwt(TEST_JWT)).thenReturn(testUser);
        when(verificationService.findUsersVerification(testUser)).thenReturn(null);
        when(verificationService.sendVerificationOTP(testUser, VerificationType.EMAIL))
                .thenReturn(testVerificationCode);
        doNothing().when(emailService).sendVerificationOtpEmail(TEST_EMAIL, TEST_OTP);

        // Act
        ResponseEntity<String> response = userController.sendVerificationOTP(
                VerificationType.EMAIL, TEST_JWT);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Verification OTP sent successfully.", response.getBody());

        // Verify service interactions
        verify(userService).findUserProfileByJwt(TEST_JWT);
        verify(verificationService).findUsersVerification(testUser);
        verify(verificationService).sendVerificationOTP(testUser, VerificationType.EMAIL);
        verify(emailService).sendVerificationOtpEmail(TEST_EMAIL, TEST_OTP);
    }
}
