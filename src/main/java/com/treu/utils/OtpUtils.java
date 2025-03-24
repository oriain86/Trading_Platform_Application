package com.treu.utils;

import java.util.Random;

// Utility class for generating One-Time Passwords (OTPs)
public class OtpUtils {

    // Generates a random 6-digit OTP as a string
    public static String generateOTP() {
        int otpLength = 6;              // Defines the length of the OTP (6 digits)

        Random random = new Random();   // Creates a Random instance for generating numbers

        // StringBuilder to efficiently build the OTP string
        StringBuilder otp = new StringBuilder(otpLength);

        // Loops to generate each digit of the OTP
        for (int i = 0; i < otpLength; i++) {
            otp.append(random.nextInt(10)); // Appends a random digit (0-9)
        }

        return otp.toString();          // Converts StringBuilder to String and returns the OTP
    }
}
