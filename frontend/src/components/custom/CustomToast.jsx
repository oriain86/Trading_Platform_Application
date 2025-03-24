/**
 * File: src/components/custom/CustomToast.jsx
 * Description: Custom toast notification component for displaying brief messages
 */

//Toast.js

import React, { useEffect, useState } from 'react'; 

/**
 * CustomToast - A toast notification component that appears briefly
 * 
 * @param {string} message - The text message to display in the toast
 * @param {boolean} show - Controls whether the toast should be visible
 * @param {function} onClose - Callback function when toast is closed/hidden
 * @returns {JSX.Element|null} Toast notification or null when hidden
 */
const CustomToast = ({ message, show, onClose }) => {
    // Internal state to manage toast visibility
    const [showToast, setShowToast] = useState(false);

    /**
     * Handles closing the toast by updating internal state
     * Note: This doesn't call the onClose prop, which could be an issue
     */
    const handleCloseToast = () => {
        setShowToast(false);
    };

    /**
     * Effect to auto-hide toast after timeout
     * Sets a timer to hide the toast after 2 seconds when visible
     */
    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                handleCloseToast();
            }, 2000); // Auto close after 2 seconds (comment incorrectly says 1 second)

            return () => clearTimeout(timer); // Cleanup timer on component unmount or when dependency changes
        }
    }, [showToast, onClose]); // onClose is in dependency array but not used in the effect

    /**
     * Effect to sync internal state with show prop
     * Updates internal showToast state whenever the show prop changes
     */
    useEffect(() => {
        setShowToast(show);
    }, [show]);

    // Render nothing if toast should be hidden
    if (!showToast) return null;

    // Render toast notification
    return (
        <div className="fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded shadow-lg">
            {message}
        </div>
    );
}; 

export default CustomToast;
