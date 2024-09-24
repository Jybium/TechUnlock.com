import formSchema from "@/schema/Signup";
import signInFormSchema from "@/schema/Signin";
import resetFormSchema from "@/schema/Reset";
import forgotFormSchema from "@/schema/Forgot";
import axios from "axios";
import { z } from "zod";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Allowed hosts to prevent SSRF
const allowedHosts = new Map([
  ["prod", BASE_URL],
  ["dev", "dev.api.com"],
]);

// Helper function to get the host
const getHost = (env = "prod") => allowedHosts.get(env);

/**
 * Handles API requests with error handling and validation.
 *
 * @param {Function} requestFunc - The request function to call.
 * @param {Object} data - The data to send with the request.
 * @param {Object} schema - The Zod schema for validation.
 * @returns {Promise} - The server response data.
 */
async function handleRequest(requestFunc, data, schema) {
  try {
    if (schema) schema.parse(data); // Validate data if schema is provided

    const response = await requestFunc(data);

    // Handle response to check for errors
    if (response.data && response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data; // Return successful response data
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200 range
      throw new Error(
        error.response.data.message || "An unexpected error occurred."
      );
    } else if (error.request) {
      // Request was made but no response received
      throw new Error(
        "No response received. Please check your network connection."
      );
    } else if (error instanceof z.ZodError) {
      // Validation error
      throw new Error(error.errors.map((err) => err.message).join(", "));
    } else {
      // Something else happened
      throw new Error("An unexpected error occurred.");
    }
  }
}

/**
 * Performs a sign-up operation.
 *
 * @param {Object} data - The user's sign-up data.
 * @returns {Promise} - The server response data.
 */
export async function signUp(data) {
  const host = getHost("prod"); // Example hardcoded to 'prod'

  return handleRequest(
    (data) => axios.post(`${host}/account/sign-up/`, data),
    data,
    formSchema
  );
}

/**
 * Performs a sign-in operation.
 *
 * @param {Object} data - The user's sign-in data.
 * @returns {Promise} - The server response data.
 */
export async function signIn(data) {
  const host = getHost("prod"); // Example hardcoded to 'prod'

  return handleRequest(
    async (data) => {
      const response = await axios.post(`${host}/account/sign-in/`, data);

      // Extract token from response and set cookie
      const token = { token: response.data.token.access };
      const apiResponse = await fetch("/api-frontend/set-cookie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(token),
      });

      if (!apiResponse.ok) throw new Error("Failed to set cookie");

      return response;
    },
    data,
    signInFormSchema
  );
}

/**
 * Performs a password reset operation.
 *
 * @param {Object} data - The user's reset password data.
 * @returns {Promise} - The server response data.
 */
export async function resetPassword(data) {
  const host = getHost("prod");

  return handleRequest(
    (data) => axios.post(`${host}/account/set-password/`, data),
    data,
    resetFormSchema
  );
}

/**
 * Performs a forgot password operation.
 *
 * @param {Object} data - The user's forgot password data.
 * @returns {Promise} - The server response data.
 */
export async function forgotPassword(data) {
  const host = getHost("prod");

  return handleRequest(
    (data) => axios.post(`${host}/account/recover-password/`, data),
    data,
    forgotFormSchema
  );
}
