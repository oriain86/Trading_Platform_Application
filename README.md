# Project: Crypto Exchange & Portfolio Management Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Platform: React & Spring Boot](https://img.shields.io/badge/Platform-React%20%26%20Spring%20Boot-blue.svg)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()

> **A comprehensive platform for cryptocurrency trading, portfolio management, AI-driven market insights, and secure wallet functionality.**

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
   - [Comprehensive Feature Set](#comprehensive-feature-set)
   - [Advanced Wallet Functionality](#advanced-wallet-functionality)
   - [Transaction History](#transaction-history)
   - [Robust Authentication & Security](#robust-authentication--security)
3. [Technology Stack](#technology-stack)
   - [Backend](#backend)
   - [Frontend](#frontend)
   - [Payment Gateways](#payment-gateways)
   - [APIs](#apis)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Project Structure](#project-structure)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact](#contact)

---

## Overview

This platform is designed to streamline the cryptocurrency trading experience by providing:
- Real-time market data (via **Gemini** & **CoinGecko**).
- Secure user wallet management and transfer capabilities.
- Advanced authentication & authorization with two-factor authentication.
- Comprehensive portfolio management tools and AI-driven insights.

By combining a modern frontend with a robust backend, our platform delivers reliability, security, and scalability for both novice and experienced traders.

---

## Features

### Comprehensive Feature Set
- **AI Chat Bot**  
  Leverages the **Gemini** and **CoinGecko** APIs to answer crypto-related queries such as real-time pricing and market data.
- **Buy & Sell Crypto**  
  Facilitates smooth crypto trading across a wide array of cryptocurrencies, supporting both crypto and fiat transactions.
- **Portfolio Management**  
  Offers detailed insights into your crypto holdings and performance for informed decision-making.

### Advanced Wallet Functionality
- **Wallet to Wallet Transfer**  
  Securely transfer funds between internal user wallets.
- **Withdrawal to Bank Account**  
  Withdraw funds directly to external bank accounts.
- **Add Balance to Wallet**  
  Effortlessly top up your wallet balance using supported payment gateways.

### Transaction History
- **Withdrawal History**  
  View and track all past withdrawals.
- **Wallet History**  
  Access detailed logs of wallet transactions.
- **Search Coin**  
  Search for any cryptocurrency to retrieve price and market information.

### Robust Authentication & Security
- **Login & Register**  
  Simple and secure user authentication process.
- **Two-Factor Authentication**  
  Adds an extra layer of security for user accounts.
- **Forgot Password**  
  Easy password recovery process via secure email verification.

---

## Technology Stack

### Backend
- **Spring Boot**  
  Application framework for Java-based development.
- **MySQL DB**  
  Relational database for storing user and transaction data.
- **Spring Security**  
  Provides authentication and authorization mechanisms.
- **Java Mail Sender**  
  Manages email notifications and password reset flows.

### Frontend
- **React**  
  A JavaScript library for building user interfaces.
- **Tailwind CSS**  
  Utility-first CSS framework for rapid UI development.
- **Redux**  
  Manages global application state in a predictable manner.
- **React-Router-Dom**  
  Handles routing in the React application.
- **Shadcn UI**  
  A set of accessible and customizable UI components.

### Payment Gateways
- **Razorpay**  
  Integration for India-based payment processing.
- **Stripe**  
  A popular global payment platform.

### APIs
- **Gemini API**  
  Provides real-time crypto exchange data.
- **CoinGecko API**  
  Comprehensive cryptocurrency market data and analytics.

---

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/crypto-exchange-platform.git
   cd crypto-exchange-platform

2. **Backend Setup (Spring Boot)**  
   - Ensure you have **Java 17+** and **Maven** installed.  
   - Configure `application.properties` (or `application.yml`) with your MySQL credentials, email credentials, payment gateway keys, etc.  
   - Build and run the backend:

     ```bash
     cd backend
     mvn clean install
     mvn spring-boot:run
     ```

3. **Frontend Setup (React)**  
   - Ensure you have **Node.js (v16+)** and **npm** or **yarn** installed.  
   - Install dependencies and run the development server:

     ```bash
     cd frontend
     npm install
     npm run dev
     ```
     _or_
     ```bash
     cd frontend
     yarn
     yarn dev
     ```

4. **Configure Payment Gateways**  
   - Set up your **Razorpay** and **Stripe** API keys in your environment variables or a secure config file.

5. **Set up APIs**  
   - Obtain API keys (if required) for **Gemini** and **CoinGecko** and add them to your backend configuration.

---

## Usage

1. **User Registration & Authentication**  
   - Register an account with email, password, and optionally enable two-factor authentication.  
   - Log in to access trading, wallet, and portfolio features.

2. **Portfolio Management**  
   - Track your crypto holdings and monitor performance in real time.

3. **Trading (Buy/Sell Crypto)**  
   - Choose from available cryptocurrencies and execute trades.  
   - Use fiat to buy crypto or withdraw directly to your bank account.

4. **AI Chat Bot**  
   - Get real-time price updates, market trends, and general crypto-related information.

5. **Wallet Operations**  
   - Transfer funds between internal wallets or withdraw to a linked bank account.  
   - Top up wallet balances via **Razorpay** or **Stripe**.

6. **Security Features**  
   - Enable two-factor authentication for enhanced security.  
   - Use the password recovery flow if needed.

---

## Project Structure

```plaintext
crypto-exchange-platform/
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/         (Spring Boot Controllers, Services, Models)
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/            (Redux)
│   │   └── App.js
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

### Acknowledgments

This project was originally developed following a guided tutorial by [Code With Zosh].
I expanded upon the core functionality by adding:
- A robust test suite (with unit and integration tests)
- Comprehensive in-line documentation and comments
- Various UI/UX enhancements on the frontend

These modifications allowed me to deepen my understanding of the underlying technologies while customizing the application to my needs. 




