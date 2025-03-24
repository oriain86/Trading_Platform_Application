// File: src/App.jsx 

// This is the main application component that handles routing and authentication

import Navbar from "./pages/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Portfolio from "./pages/Portfolio/Portfolio";
import Auth from "./pages/Auth/Auth";
import { Route, Routes } from "react-router-dom";
import StockDetails from "./pages/StockDetails/StockDetails";
import Profile from "./pages/Profile/Profile";
import Notfound from "./pages/Notfound/Notfound";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./Redux/Auth/Action";
import Wallet from "./pages/Wallet/Wallet";
import Watchlist from "./pages/Watchlist/Watchlist";
import TwoFactorAuth from "./pages/Auth/TwoFactorAuth";
import ResetPasswordForm from "./pages/Auth/ResetPassword";
import PasswordUpdateSuccess from "./pages/Auth/PasswordUpdateSuccess";
import LoginWithGoogle from "./pages/Auth/LoginWithGoogle.";
import PaymentSuccess from "./pages/Wallet/PaymentSuccess";
import Withdrawal from "./pages/Wallet/Withdrawal";
import PaymentDetails from "./pages/Wallet/PaymentDetails";
import WithdrawalAdmin from "./Admin/Withdrawal/WithdrawalAdmin";
import Activity from "./pages/Activity/Activity";
import SearchCoin from "./pages/Search/Search";
import { shouldShowNavbar } from "./Util/shouldShowNavbar";

/**
 * Route configuration array defining which routes should show the navbar
 * and what user roles can access them
 * 
 * Each route object contains:
 * @property {string} path - The URL path pattern
 * @property {string} role - The role required to access this route
 */
const routes = [
  { path: "/", role: "ROLE_USER" },                    // Home page
  { path: "/portfolio", role: "ROLE_USER" },           // Portfolio page
  { path: "/activity", role: "ROLE_USER" },            // Activity/transaction history
  { path: "/wallet", role: "ROLE_USER" },              // Wallet page
  { path: "/withdrawal", role: "ROLE_USER" },          // Withdrawal page
  { path: "/payment-details", role: "ROLE_USER" },     // Payment details page
  { path: "/wallet/success", role: "ROLE_USER" },      // Payment success page
  { path: "/market/:id", role: "ROLE_USER" },          // Cryptocurrency details page
  { path: "/watchlist", role: "ROLE_USER" },           // Watchlist page
  { path: "/profile", role: "ROLE_USER" },             // User profile page
  { path: "/search", role: "ROLE_USER" },              // Search page
  { path: "/admin/withdrawal", role: "ROLE_ADMIN" }    // Admin withdrawal management page
];

/**
 * Main application component
 * 
 * This component:
 * 1. Fetches the user profile on load
 * 2. Manages authentication state
 * 3. Controls which routes are accessible based on auth status
 * 4. Handles conditional rendering of the navbar
 * 
 * @returns {JSX.Element} The application UI with conditional routing
 */
function App() {
  // Access auth state from Redux store
  const {auth} = useSelector(store => store);
  const dispatch = useDispatch();

  // Fetch user data when JWT changes
  useEffect(() => {
    // Get JWT from localStorage and fetch user profile
    dispatch(getUser(localStorage.getItem("jwt")))
  }, [auth.jwt]) // Re-fetch when JWT changes

  // Determine if navbar should be shown based on current path and user role
  const showNavbar = !auth.user ? false : shouldShowNavbar(location.pathname, routes, auth.user?.role)

  return (
    <>
      {/* Conditional rendering based on authentication state */}
      {auth.user ? (
        // Authenticated user routes
        <>
          {/* Only show navbar on appropriate routes */}
          {showNavbar && <Navbar />}
          
          <Routes>
            {/* Main application routes requiring authentication */}
            <Route element={<Home />} path="/" />
            <Route element={<Portfolio />} path="/portfolio" />
            <Route element={<Activity />} path="/activity" />
            <Route element={<Wallet />} path="/wallet" />
            <Route element={<Withdrawal />} path="/withdrawal" />
            <Route element={<PaymentDetails />} path="/payment-details" />
            <Route element={<Wallet />} path="/wallet/:order_id" />
            <Route element={<StockDetails />} path="/market/:id" />
            <Route element={<Watchlist />} path="/watchlist" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<SearchCoin />} path="/search" />
            
            {/* Admin-only route with role-based conditional rendering */}
            {auth.user.role === "ROLE_ADMIN" && 
              <Route element={<WithdrawalAdmin />} path="/admin/withdrawal" />
            }
            
            {/* Catch-all route for non-matching paths */}
            <Route element={<Notfound />} path="*" />
          </Routes>
        </>
      ) : (
        // Unauthenticated user routes
        <>
          <Routes>
            {/* Authentication-related routes */}
            <Route element={<Auth />} path="/" />
            <Route element={<Auth />} path="/signup" />
            <Route element={<Auth />} path="/signin" />
            <Route element={<Auth />} path="/forgot-password" />
            <Route element={<LoginWithGoogle />} path="/login-with-google" />
            <Route element={<ResetPasswordForm />} path="/reset-password/:session" />
            <Route element={<PasswordUpdateSuccess />} path="/password-update-successfully" />
            <Route element={<TwoFactorAuth />} path="/two-factor-auth/:session" />
            
            {/* Catch-all route for non-matching paths */}
            <Route element={<Notfound />} path="*" />
          </Routes>
        </>
      )}
    </>
  );
}

export default App; 
