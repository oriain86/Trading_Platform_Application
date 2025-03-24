package com.treu.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;

// Custom filter to validate JWTs and set authentication in the security context
public class JwtTokenValidator extends OncePerRequestFilter {

    // Filters each HTTP request to validate the JWT and authenticate the user
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // Retrieves the JWT from the Authorization header
        String jwt = request.getHeader(JwtConstant.JWT_HEADER);

        // Checks if the JWT exists in the request
        if (jwt != null) {
            // Removes the "Bearer " prefix (first 7 characters) from the token
            jwt = jwt.substring(7);

            try {
                // Creates the secret key from the hardcoded SECRET_KEY in JwtConstant
                SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

                // Parses the JWT and extracts its claims using the secret key
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJws(jwt)
                        .getBody();

                // Extracts the email claim from the token
                String email = String.valueOf(claims.get("email"));

                // Extracts the authorities (roles) claim from the token
                String authorities = String.valueOf(claims.get("authorities"));

                // Logs the authorities for debugging (consider using a logger instead)
                System.out.println("authorities -------- " + authorities);

                // Converts the comma-separated authorities string into a list of GrantedAuthority objects
                List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

                // Creates an Authentication object with the email and authorities (no password needed)
                Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auths);

                // Sets the authentication in the Spring Security context
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (Exception e) {
                // Throws a runtime exception if the token is invalid (e.g., malformed, expired, or tampered)
                throw new RuntimeException("invalid token...");
            }
        }
        // Continues the filter chain to process the request
        filterChain.doFilter(request, response);
    }
}
