import { apiClient } from "@/helpers/apiClient";
import { fetchToken } from "@/helpers/getToken";
import axios from "axios";

const BASE_URL = "https://test.techunlock.org/test/api";

const feedbackEndpoint = `${BASE_URL}/admin-app/feedbacks/`;
const feedbackEndpoints = `${BASE_URL}/course/add-feedback/`;

export const addFeedback = async (feedbackData) => {
  const token = await fetchToken();
  try {
    const response = await apiClient.post(feedbackEndpoints, feedbackData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Handle response to check for errors
    if (response.data && response.data.error) {
      throw new Error(response.data.error); // Assuming the error message is in response.data.error
    }
    // Handle successful response
    return response.data;
  } catch (error) {
    console.error("Error during adding feedback:", error);

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
};

export const getFeedback = async () => {
  const token = await fetchToken();
  const response = await apiClient.get(feedbackEndpoint, {
    params: {
      page: page,
      page_size: pageSize,
      search: search,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
