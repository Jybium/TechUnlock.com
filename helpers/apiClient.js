import axios from "axios";
import { fetchToken } from "./getToken";

const apiClient = axios.create({
  baseURL: "https://test.techunlock.org/test/api",
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
    tokenExpiration = Date.now() + 15 * 60 * 1000;
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
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
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
