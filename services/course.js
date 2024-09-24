import { apiClient } from "@/helpers/apiClient";
import { fetchToken } from "@/helpers/getToken";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getCourses() {
  try {
    const response = await apiClient.get(`${BASE_URL}/course/courses/`);

    // Handle response to check for errors
    if (response.data && response.data.error) {
      throw new Error(response.data.error); // Assuming the error message is in response.data.error
    }
    // Handle successful response
    return response.data;
  } catch (error) {
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

export async function registerForCourse(paymentData) {
  const token = await fetchToken();
  try {
    const response = await axios.post(
      `${BASE_URL}/payment/initialize-payment/`,
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 5000,
      }
    );

    if (response.status === 200) {
      // Successfully initialized payment
      return response.data;
    } else {
      // Handle unexpected response status

      return "An error occurred while initializing payment.";
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
    } else if (error.request) {
      // The request was made but no response was received
    } else {
      // Something happened in setting up the request that triggered an Error
    }

    return "An error occurred while initializing payment.";
  }
}
export async function getEnrolledCourses() {
  const token = await fetchToken();
  try {
    if (token) {
      const response = await axios.get(`${BASE_URL}/course/enrolled-courses/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 5000,
      });

      if (response.status === 200) {
        return response.data;
      } else {
        // Handle unexpected response status

        return "An error occurred while getting enrolled courses.";
      }
    }
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200 range
      throw new Error(error.response.data.message || "An error occurred.");
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
