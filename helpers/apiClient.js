import axios from "axios";
import { fetchToken } from "./getToken";

const apiClient = axios.create({
  baseURL: "https://techunlock.pythonanywhere.com",
});

let cachedToken = null;
let tokenExpiration = null;

const getToken = async () => {
  if (cachedToken && tokenExpiration && tokenExpiration > Date.now()) {
    return cachedToken;
  }

  const token = await fetchToken();
  if (token) {
    cachedToken = token;
    tokenExpiration = Date.now() + 15 * 60 * 1000; // Set token expiration time to 15 minutes.
  }

  return token;
};

apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger

    return response;
  },
  async (error) => {
    // Refresh token and retry request if token has expired
    if (error.response && error.response.status === 401) {
      cachedToken = null;
      tokenExpiration = null;
      const token = await getToken();

      if (token) {
        error.config.headers.Authorization = `Bearer ${token}`;
        return apiClient.request(error.config);
      }
    }

    return Promise.reject(error);
  }
);

export { apiClient };
