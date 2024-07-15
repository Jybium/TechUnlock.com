import axios from "axios";
import { fetchToken } from "./getToken";

const apiClient = axios.create({
  baseURL: "https://techunlock.pythonanywhere.com",
  headers: {
    "Content-Type": "application/json",
  },
});

let cachedToken;
let tokenExpiration;

const getToken = async () => {
  if (cachedToken && tokenExpiration && tokenExpiration > Date.now()) {
    return cachedToken;
  }

  const token = await fetchToken();
  if (token) {
    cachedToken = token;
    tokenExpiration = Date.now() + 15 * 60 * 1000; // Set token expiration time.
  }

  return token;
};

const initializeInterceptors = (setIsLoading) => {
  apiClient.interceptors.request.use(
    async (config) => {
      setIsLoading(true);
      const token = await getToken();
      setIsLoading(false);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      setIsLoading(false);
      return Promise.reject(error);
    }
  );
};

export { apiClient, initializeInterceptors };
