import { apiClient } from "@/helpers/apiClient";
import { fetchToken } from "@/helpers/getToken";
import axios from "axios";

const BASE_URL = "https://test.techunlock.org/test/api";

const BADGE_ENDPOINT = `${BASE_URL}/badge/badges/`;

const getBadges = async () => {
  try {
    const response = await apiClient.get(BADGE_ENDPOINT);
    // Handle response to check for errors
    if (response.data && response.data.error) {
      throw new Error(response.data.error); // Assuming the error message is in response.data.error
    }
    // Handle successful response
    return response.data;
  } catch (error) {
    console.error("Error fetching badges:", error);
    throw new Error("An unexpected error occurred.");
  }
};

const listUserBadges = async (userId) => {
  const token = await fetchToken();
  try {
    const response = await apiClient.get(`${BASE_URL}/course/user-badges/`, {
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
    console.error("Error fetching user badges:", error);
    throw new Error("An unexpected error occurred.");
  }
};

const addBadge = async (badgeData) => {
  const token = await fetchToken();
  try {
    const response = await apiClient.post(BADGE_ENDPOINT, badgeData, {
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
    console.error("Error adding badge:", error);
    throw new Error("An unexpected error occurred.");
  }
};

export { getBadges, listUserBadges, addBadge };
