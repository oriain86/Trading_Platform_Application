package com.treu.controller;

import com.treu.config.JwtProvider;
import com.treu.exception.UserException;
import com.treu.model.TwoFactorOTP;
import com.treu.model.User;
import com.treu.repository.UserRepository;
import com.treu.request.LoginRequest;
import com.treu.response.AuthResponse;
import com.treu.service.*;
import com.treu.utils.OtpUtils;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

// Marks this class as a REST controller, handling authentication-related requests under /auth
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired private UserRepository userRepository;          // Repository for user data access
    @Autowired private PasswordEncoder passwordEncoder;        // Encoder for hashing passwords
    @Autowired private CustomUserServiceImpl customUserDetails;// Custom UserDetailsService for authentication
    @Autowired private UserService userService;                // Service for user-related operations
    @Autowired private WatchlistService watchlistService;      // Service for managing user watchlists
    @Autowired private WalletService walletService;            // Service for managing user wallets
    @Autowired private VerificationService verificationService;// Service for verification logic
    @Autowired private TwoFactorOtpService twoFactorOtpService;// Service for two-factor OTP management
    @Autowired private EmailService emailService;              // Service for sending emails

    // Handles POST requests to register a new user
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {
        String email = user.getEmail();
        String password = user.getPassword();
        String fullName = user.getFullName();
        String mobile = user.getMobile();

        // Checks if the email is already in use
        User isEmailExist = userRepository.findByEmail(email);
        if (isEmailExist != null) {
            throw new UserException("Email Is Already Used With Another Account");
        }

        // Creates and populates a new user entity
        User createdUser = new User();
        createdUser.setEmail(email);
        createdUser.setFullName(fullName);
        createdUser.setMobile(mobile);
        createdUser.setPassword(passwordEncoder.encode(password)); // Hashes the password

        // Saves the user to the database
        User savedUser = userRepository.save(createdUser);

        // Creates a watchlist for the new user (wallet creation is commented out)
        watchlistService.createWatchList(savedUser);
//		walletService.createWallet(user);

        // Sets up authentication for the new user
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generates a JWT for the user
        String token = JwtProvider.generateToken(authentication);

        // Builds the response with the JWT and success message
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Register Success");

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    // Handles POST requests for user login
    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signing(@RequestBody LoginRequest loginRequest) throws UserException, MessagingException {
        String username = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        // Logs the login attempt (for debugging; consider a logging framework)
        System.out.println(username + " ----- " + password);

        // Authenticates the user credentials
        Authentication authentication = authenticate(username, password);

        // Retrieves the user by email
        User user = userService.findUserByEmail(username);

        // Sets the authentication in the security context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generates a JWT for the authenticated user
        String token = JwtProvider.generateToken(authentication);

        // Handles two-factor authentication if enabled
        if (user.getTwoFactorAuth().isEnabled()) {
            AuthResponse authResponse = new AuthResponse();
            authResponse.setMessage("Two factor authentication enabled");
            authResponse.setTwoFactorAuthEnabled(true);

            // Generates a one-time password (OTP)
            String otp = OtpUtils.generateOTP();

            // Deletes any existing OTP for the user
            TwoFactorOTP oldTwoFactorOTP = twoFactorOtpService.findByUser(user.getId());
            if (oldTwoFactorOTP != null) {
                twoFactorOtpService.deleteTwoFactorOtp(oldTwoFactorOTP);
            }

            // Creates a new OTP entry with the JWT
            TwoFactorOTP twoFactorOTP = twoFactorOtpService.createTwoFactorOtp(user, otp, token);

            // Sends the OTP to the user's email
            emailService.sendVerificationOtpEmail(user.getEmail(), otp);

            // Returns a response with the OTP session ID
            authResponse.setSession(twoFactorOTP.getId());
            return new ResponseEntity<>(authResponse, HttpStatus.OK);
        }

        // Returns a standard login success response if 2FA is not enabled
        AuthResponse authResponse = new AuthResponse();
        authResponse.setMessage("Login Success");
        authResponse.setJwt(token);

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    // Authenticates a user based on username and password
    private Authentication authenticate(String username, String password) {
        // Loads user details from the custom UserDetailsService
        UserDetails userDetails = customUserDetails.loadUserByUsername(username);

        // Logs user details (for debugging; consider a logging framework)
        System.out.println("sign in userDetails - " + userDetails);

        // Throws an exception if the user doesn't exist
        if (userDetails == null) {
            System.out.println("sign in userDetails - null " + userDetails);
            throw new BadCredentialsException("Invalid username or password");
        }
        // Verifies the password matches the stored hash
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            System.out.println("sign in userDetails - password not match " + userDetails);
            throw new BadCredentialsException("Invalid username or password");
        }
        // Returns an Authentication object with user details and authorities
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    // Redirects to Google OAuth2 login page
    @GetMapping("/login/google")
    public void redirectToGoogle(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Redirects the user to the Google OAuth2 authorization endpoint
        response.sendRedirect("/login/oauth2/authorization/google");
    }

    // Handles the Google OAuth2 callback after authentication
    @GetMapping("/login/oauth2/code/google")
    public User handleGoogleCallback(
            @RequestParam(required = false, name = "code") String code,      // Authorization code from Google
            @RequestParam(required = false, name = "state") String state,   // State parameter for CSRF protection
            OAuth2AuthenticationToken authentication                        // OAuth2 authentication token
    ) {
        // Extracts user details from the OAuth2 authentication object
        String email = authentication.getPrincipal().getAttribute("email");
        String fullName = authentication.getPrincipal().getAttribute("name");

        // Creates a new User object with Google-provided details
        User user = new User();
        user.setEmail(email);
        user.setFullName(fullName);

        return user; // Note: This user is not saved or authenticated yet
    }

    // Verifies the two-factor OTP for login
    @PostMapping("/two-factor/otp/{otp}")
    public ResponseEntity<AuthResponse> verifySigningOtp(
            @PathVariable String otp,       // OTP provided by the user
            @RequestParam String id         // ID of the TwoFactorOTP entity
    ) throws Exception {
        // Retrieves the TwoFactorOTP entity by ID
        TwoFactorOTP twoFactorOTP = twoFactorOtpService.findById(id);

        // Verifies the OTP; if valid, returns a success response with the JWT
        if (twoFactorOtpService.verifyTwoFactorOtp(twoFactorOTP, otp)) {
            AuthResponse authResponse = new AuthResponse();
            authResponse.setMessage("Two factor authentication verified");
            authResponse.setTwoFactorAuthEnabled(true);
            authResponse.setJwt(twoFactorOTP.getJwt());
            return new ResponseEntity<>(authResponse, HttpStatus.OK);
        }
        // Throws an exception if the OTP is invalid
        throw new Exception("invalid otp");
    }
}
