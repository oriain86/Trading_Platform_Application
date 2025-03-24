package com.treu.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.Setter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import javax.crypto.SecretKey;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

// Utility class for generating and parsing JWTs (JSON Web Tokens)
public class JwtProvider {

    // Method to set the key for testing purposes
    // Replace the default key with the injected key
    // Secret key initialized using the SECRET_KEY from JwtConstant, converted to HMAC-SHA key
    @Setter
    private static SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    // Generates a JWT based on the provided Authentication object
    public static String generateToken(Authentication auth) {
        // Retrieves the user's authorities (roles/permissions)
        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
        // Converts authorities into a comma-separated string
        String roles = populateAuthorities(authorities);

        // Builds and signs the JWT
        String jwt = Jwts.builder()
                // Sets the issuance time to the current date/time
                .setIssuedAt(new Date())
                // Sets expiration to 24 hours (86400000 ms) from now
                .setExpiration(new Date(new Date().getTime() + 86400000))
                // Adds the user's email (auth.getName()) as a custom claim
                .claim("email", auth.getName())
                // Adds the user's roles/authorities as a custom claim
                .claim("authorities", roles)
                // Signs the token with the secret key
                .signWith(key)
                // Compacts the token into a URL-safe string
                .compact();
        return jwt;
    }

    // Extracts the email from a JWT string
    public static String getEmailFromJwtToken(String jwt) {
        // Removes the "Bearer " prefix (first 7 characters) from the token
        jwt = jwt.substring(7);

        // Parses the JWT and retrieves its claims using the secret key
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwt)
                .getBody();
        // Extracts the email claim and converts it to a String
        String email = String.valueOf(claims.get("email"));

        return email;
    }

    // Converts a collection of authorities into a comma-separated string
    public static String populateAuthorities(Collection<? extends GrantedAuthority> collection) {
        // Creates a HashSet to store unique authority strings
        Set<String> auths = new HashSet<>();

        // Adds each authority to the set
        for (GrantedAuthority authority : collection) {
            auths.add(authority.getAuthority());
        }
        // Joins the authorities with commas into a single string
        return String.join(",", auths);
    }
}
