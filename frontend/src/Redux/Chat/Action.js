// File: src/Redux/Chat/Action.js
// This file contains Redux action creators for chatbot functionality

/* eslint-disable no-unused-vars */
import api from "@/Api/api";
import {
  CHAT_BOT_FAILURE,
  CHAT_BOT_REQUEST,
  CHAT_BOT_SUCCESS,
} from "./ActionTypes";

/**
 * Action creator for sending messages to the chatbot
 * 
 * This function dispatches actions to send a user message to the chatbot API,
 * handle the response, and update the Redux store accordingly.
 * 
 * @param {Object} params - Parameters for the chatbot message
 * @param {string} params.prompt - The user's message text
 * @param {string} params.jwt - JWT token for authentication
 * @returns {Function} - Thunk function that handles the API communication
 */
export const sendMessage = ({prompt, jwt}) => async (dispatch) => {
  // Dispatch request action with the user's message
  dispatch({
    type: CHAT_BOT_REQUEST,
    payload: {
      prompt: prompt,   // The user's message text
      role: "user"      // Identify this message as coming from the user
    }
  });

  try {
    // Make API request to the chatbot endpoint
    const { data } = await api.post(
      "/chat/bot/coin",  // Endpoint for the coin-related chatbot
      { prompt },        // Send the user's message
      {
        headers: {
          Authorization: `Bearer ${jwt}`  // Include authentication token
        }
      }
    );
    
    // Dispatch success action with the chatbot's response
    dispatch({
      type: CHAT_BOT_SUCCESS,
      payload: {
        ans: data.message,  // The response message from the chatbot
        role: "model"       // Identify this message as coming from the model
      },
    });
    console.log("get success ans", data);
  } catch (error) {
    // Dispatch failure action if the request fails
    dispatch({ 
      type: CHAT_BOT_FAILURE, 
      payload: error      // Include error details
    });
    console.log(error);
  }
};
