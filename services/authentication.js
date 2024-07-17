import formSchema from "@/schema/Signup";
import signInFormSchema from "@/schema/Signin";
import resetFormSchema from "@/schema/Reset";
import forgotFormSchema from "@/schema/Forgot";
import axios from "axios";
import { z } from "zod";

const BASE_URL = "https://techunlock.pythonanywhere.com";

/**
 * Performs a sign-up operation.
 *
 * @param data - The user's sign-up data.
 * @returns A promise that resolves with the server response data.
 * @throws An error if the sign-up operation fails.
 */
export async function signUp(data) {
  try {
    // Validate data against schema
    formSchema.parse(data);

    const response = await apiClient.post(`${BASE_URL}/account/sign-up/`, data);

    // Handle successful response
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200 range
      throw new Error(
        error.response.data.message || "An error occurred while signing up."
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
 * Performs a sign-in operation.
 *
 * @param data - The user's sign-in data.
 * @returns A promise that resolves with the server response data.
 * @throws An error if the sign-in operation fails.
 */
export async function signIn(data) {
  try {
    // Validate data against schema
    signInFormSchema.parse(data);

    const response = await axios.post(`${BASE_URL}/account/sign-in/`, data);

    // Handle response to check for errors
    if (response.data && response.data.error) {
      throw new Error(response.data.error); // Assuming the error message is in response.data.error
    }

    const token = { token: response.data.token.access };

    const apiResponse = await fetch("/api/set-cookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token),
    });

    if (!apiResponse.ok) {
      throw new Error("Failed to set cookie");
    }

    // Handle successful response
    return response.data;
  } catch (error) {
    console.error("Error during sign-in:", error);

    if (error.response) {
      // Server responded with a status other than 200 range
      throw new Error(
        error.response.data.message || "An error occurred while signing in."
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

export async function resetPassword(data) {
  try {
    console.log("Validating data for sign-in...");
    // Validate data against schema
    resetFormSchema.parse(data);
    console.log("Data validated. Sending sign-in request...");

    const response = await axios.post(`${BASE_URL}/account/sign-in/`, data);
    console.log("Sign-in response received:", response.data);

    // Handle response to check for errors
    if (response.data && response.data.error) {
      throw new Error(response.data.error); // Assuming the error message is in response.data.error
    }

    // Handle successful response
    return response.data;
  } catch (error) {
    console.error("Error during sign-in:", error);

    if (error.response) {
      // Server responded with a status other than 200 range
      throw new Error(
        error.response.data.message || "An error occurred while signing in."
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

export async function forgotPassword(data) {
  try {
    console.log("Validating data for sign-in...");
    // Validate data against schema
    forgotFormSchema.parse(data);
    console.log("Data validated. Sending sign-in request...");

    const response = await axios.post(`${BASE_URL}/account/sign-in/`, data);
    console.log("Sign-in response received:", response.data);

    // Handle response to check for errors
    if (response.data && response.data.error) {
      throw new Error(response.data.error); // Assuming the error message is in response.data.error
    }

    // Handle successful response
    return response.data;
  } catch (error) {
    console.error("Error during sign-in:", error);

    if (error.response) {
      // Server responded with a status other than 200 range
      throw new Error(
        error.response.data.message || "An error occurred while signing in."
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
