package com.treu.config;

import com.treu.model.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;

// Marks this class as a Spring configuration class for defining beans
@Configuration
public class AppConfig {

    // Defines the security configuration for the application
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        // Configures the app to be stateless (no server-side sessions, suitable for JWT)
        http.sessionManagement(management -> management.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS))
                // Sets up authorization rules for HTTP requests
                .authorizeHttpRequests(Authorize -> Authorize
                                // Uncomment to restrict /api/admin/** to ADMIN role
//	                	.requestMatchers("/api/admin/**").hasRole("ADMIN")
                                // Requires authentication for all /api/** endpoints
                                .requestMatchers("/api/**").authenticated()
                                // Allows all other requests without authentication
                                .anyRequest().permitAll()
                )

                // Configures OAuth2 login (e.g., Google login)
                .oauth2Login(oauth -> {
                    // Custom login page for OAuth2
                    oauth.loginPage("/login/google");
                    // Base URI for OAuth2 authorization requests
                    oauth.authorizationEndpoint(authorization ->
                            authorization.baseUri("/login/oauth2/authorization"));
                    // Handles successful OAuth2 login
                    oauth.successHandler(new AuthenticationSuccessHandler() {
                        @Override
                        public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                                            Authentication authentication)
                                throws IOException, ServletException {
                            // Checks if the authenticated principal is an OAuth2 user
                            if (authentication.getPrincipal() instanceof DefaultOAuth2User) {
                                // Casts the principal to DefaultOAuth2User to access OAuth2 attributes
                                DefaultOAuth2User userDetails = (DefaultOAuth2User) authentication.getPrincipal();
                                // Extracts user details from OAuth2 provider (e.g., Google)
                                String email = userDetails.getAttribute("email");
                                String fullName = userDetails.getAttribute("name");
                                String phone = userDetails.getAttribute("phone");
                                String picture = userDetails.getAttribute("picture");
                                // Ensures email_verified is true only if explicitly set to true
                                boolean email_verified = Boolean.TRUE.equals(
                                        userDetails.getAttribute("email_verified"));

                                // Creates a new User object and populates it with OAuth2 data
                                User user = new User();
                                user.setVerified(email_verified);
                                user.setFullName(fullName);
                                user.setEmail(email);
                                user.setMobile(phone);
                                user.setPicture(picture);

                                // Logs user info to console (for debugging; consider using a logger instead)
                                System.out.println("--------------- " + email +
                                        "-------------" +
                                        "===========" +
                                        "-------" + user);
                            }
                        }
                    });
                })
                // Adds a custom JWT validation filter before BasicAuthenticationFilter
                .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
                // Disables CSRF protection (common for stateless APIs)
                .csrf(csrf -> csrf.disable())
                // Enables CORS with a custom configuration source
                .cors(cors -> cors.configurationSource(corsConfigurationSource()));

        // Builds and returns the configured SecurityFilterChain
        return http.build();
    }

    // Defines CORS configuration to allow cross-origin requests from specific domains
    private CorsConfigurationSource corsConfigurationSource() {
        return new CorsConfigurationSource() {
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                // Creates a new CORS configuration object
                CorsConfiguration cfg = new CorsConfiguration();
                // Specifies allowed origins (domains) for cross-origin requests
                cfg.setAllowedOrigins(Arrays.asList(
                        "http://localhost:3000",  // Local dev (React)
                        "http://localhost:5173",  // Local dev (Vite)
                        "http://localhost:5174",  // Local dev (Vite alternate)
                        "http://localhost:4200",  // Local dev (Angular)
                        "https://treu-trading.vercel.app"  // Production domain
                ));
                // Allows all HTTP methods (GET, POST, etc.)
                cfg.setAllowedMethods(Collections.singletonList("*"));
                // Allows credentials (e.g., cookies, Authorization headers) in requests
                cfg.setAllowCredentials(true);
                // Allows all headers in requests
                cfg.setAllowedHeaders(Collections.singletonList("*"));
                // Exposes the Authorization header (e.g., for JWT) to the client
                cfg.setExposedHeaders(Arrays.asList("Authorization"));
                // Sets the max age for caching CORS preflight responses (1 hour)
                cfg.setMaxAge(3600L);
                return cfg;
            }
        };
    }

    // Defines a BCrypt password encoder bean for hashing passwords
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
