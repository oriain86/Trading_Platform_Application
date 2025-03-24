package com.treu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Marks this class as the main Spring Boot application with auto-configuration
@SpringBootApplication
public class TradingPlatformApplication {

	// Entry point for the Spring Boot application
	public static void main(String[] args) {
		// Launches the Spring Boot application with the specified class and command-line arguments
		SpringApplication.run(TradingPlatformApplication.class, args);
	}
}
