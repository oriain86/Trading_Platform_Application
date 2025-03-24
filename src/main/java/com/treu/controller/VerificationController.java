package com.treu.controller;

import com.treu.service.EmailService;
import com.treu.service.UserService;
import com.treu.service.VerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

// Marks this class as a REST controller, intended for verification-related requests
@RestController
public class VerificationController {

    // Service for handling verification-related operations, injected via constructor
    private final VerificationService verificationService;

    // Service for handling user-related operations, injected via constructor
    private final UserService userService;

    // Service for sending emails, injected via @Autowired
    @Autowired
    private EmailService emailService;

    // Constructor injection for VerificationService and UserService
    @Autowired
    public VerificationController(VerificationService verificationService, UserService userService) {
        this.verificationService = verificationService;
        this.userService = userService;
    }
}
