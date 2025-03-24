package com.treu.config;

// Defines constants used for JWT (JSON Web Token) configuration
public class JwtConstant {

    // Secret key used for signing and verifying JWTs (should be securely stored, not hardcoded)
    public static final String SECRET_KEY = "fsdfsdkfsdfsfjiuy7r6ftydrxfcgvhbjny78t65rdrtjkpnvdfvjkzfjfdfnsjk";

    // HTTP header name where the JWT is expected to be included in requests
    public static final String JWT_HEADER = "Authorization";
}
