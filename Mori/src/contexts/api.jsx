import axios from 'axios';
import { getNewAccessToken } from '../service/auth'; // Ensure this path is correct

let api;
let isInitialized = false;

export const setupInterceptors = (accessToken, setToken) => {
  api = axios.create({
    baseURL: "http://127.0.0.1:8000", // Replace with your API base URL
    withCredentials: true,
  });

  // Request interceptor to add access token to headers
  api.interceptors.request.use(
    async (config) => {
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle token refresh
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newAccessToken = await getNewAccessToken();
        if (newAccessToken) {
          setToken(newAccessToken);
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );

  isInitialized = true;
  return api;
};

export const initializeApi = (accessToken, setToken) => {
  if (!isInitialized) {
    setupInterceptors(accessToken, setToken);
  }
  return api;
};

export const getApi = () => {
  if (!api || !isInitialized) {
    throw new Error("API instance not initialized. Call setupInterceptors first.");
  }
  return api;
};
