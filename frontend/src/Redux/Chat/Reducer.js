// File: src/Redux/Chat/Reducer.js
// This file defines the Redux reducer for managing chatbot conversation state

// Import action type constants for chatbot operations
import { CHAT_BOT_FAILURE } from "./ActionTypes";
import { CHAT_BOT_SUCCESS } from "./ActionTypes";
import { CHAT_BOT_REQUEST } from "./ActionTypes";

/**
 * Initial state for chatbot functionality
 * 
 * @property {Object|null} message - The most recent message in the conversation
 * @property {Array} messages - History of all messages in the conversation
 * @property {boolean} loading - Indicates if a message is being processed
 * @property {Object|null} error - Error information if a chatbot request fails
 */
const initialState = {
  message: null,    // Stores the most recent message (typically the model's response)
  messages: [],     // Maintains the conversation history (both user and model messages)
  loading: false,   // Tracks if a message is currently being processed
  error: null,      // Stores any error that occurs during chatbot communication
};

/**
 * Chatbot reducer handles state changes for all chatbot-related actions
 * 
 * @param {Object} state - Current state (defaults to initialState if undefined)
 * @param {Object} action - Redux action containing type and payload/error
 * @return {Object} The new state after applying the action
 */
const chatBotReducer = (state = initialState, action) => {
  switch (action.type) {
    // When a user message is sent to the chatbot
    case CHAT_BOT_REQUEST:
      return {
        ...state,                          // Preserve existing state
        loading: true,                     // Set loading to true while waiting for response
        error: null,                       // Clear any previous errors
        messages: [...state.messages,      // Add the user message to conversation history
                   action.payload]         // The payload contains {prompt, role: "user"}
      };
      
    // When a response is received from the chatbot
    case CHAT_BOT_SUCCESS:
      return {
        ...state,
        message: action.payload,           // Store the most recent message (bot response)
        messages: [...state.messages,      // Add the bot response to conversation history
                   action.payload],        // The payload contains {ans, role: "model"}
        loading: false,                    // Reset loading state
        error: null,                       // Clear any errors
      };

    // When a chatbot request fails
    case CHAT_BOT_FAILURE:
      return {
        ...state,
        loading: false,                    // Reset loading state
        error: action.error,               // Store error information
      };
      
    // Return unchanged state for unhandled action types
    default:
      return state;
  }
};

export default chatBotReducer;
