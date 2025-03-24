package com.treu.service;

// Exception for messaging-related errors in Jakarta Mail
import jakarta.mail.MessagingException;
// Class representing a MIME email message in Jakarta Mail
import jakarta.mail.internet.MimeMessage;
// Spring annotation for dependency injection
import org.springframework.beans.factory.annotation.Autowired;
// General exception for mail sending issues in Spring
import org.springframework.mail.MailException;
// Specific exception for mail sending failures in Spring
import org.springframework.mail.MailSendException;
// Spring interface for sending emails
import org.springframework.mail.javamail.JavaMailSender;
// Helper class for constructing MIME messages in Spring
import org.springframework.mail.javamail.MimeMessageHelper;
// Spring annotation to mark this class as a service
import org.springframework.stereotype.Service;

// Marks this class as a Spring service bean
@Service
public class EmailService {

    // Spring's email sender component, injected for sending emails
    @Autowired
    private JavaMailSender javaMailSender;

    // Sends a verification OTP email to the specified user email address
    public void sendVerificationOtpEmail(String userEmail, String otp) throws MessagingException, MailSendException {
        // Creates a new MIME message for email construction
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        // Helper to simplify setting MIME message properties, using UTF-8 encoding
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        // Defines the email subject
        String subject = "Account verification";
        // Defines the email body with the OTP
        String text = "your account verification code is : " + otp;

        helper.setSubject(subject);     // Sets the email subject
        helper.setText(text, true);     // Sets the email body, true indicates HTML support (though not used here)
        helper.setTo(userEmail);        // Sets the recipient email address

        try {
            // Attempts to send the email using the injected JavaMailSender
            javaMailSender.send(mimeMessage);
        } catch (MailException e) {
            // Catches any mail sending errors and throws a specific exception
            throw new MailSendException("Failed to send email");
        }
    }
}
