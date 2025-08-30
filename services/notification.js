import { apiClient } from "@/helpers/apiClient";
import { fetchToken } from "@/helpers/getToken";
import axios from "axios";

const BASE_URL = "https://test.techunlock.org/test/api";

const notificationEndpoint = `${BASE_URL}/notification/user-notifications/`;

const getNotifications = async (status) => {
  const token = await fetchToken();
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    if (status && status !== "all") {
      config.params = { status };
    }
    const response = await apiClient.get(notificationEndpoint, config);
    // Handle response to check for errors
    if (response.data && response.data.error) {
      throw new Error(response.data.error); // Assuming the error message is in response.data.error
    }
    // Handle successful response
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("An unexpected error occurred.");
  }
};

const markNotificationAsRead = async (notificationId) => {
  const token = await fetchToken();
  try {
    const response = await apiClient.patch(
      `${notificationEndpoint}${notificationId}/`,
      { read: true },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Handle response to check for errors
    if (response.data && response.data.error) {
      throw new Error(response.data.error); // Assuming the error message is in response.data.error
    }
    // Handle successful response
    return response.data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw new Error("An unexpected error occurred.");
  }
};

export { getNotifications, markNotificationAsRead };
