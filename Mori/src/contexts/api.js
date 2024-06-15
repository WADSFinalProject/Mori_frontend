import axios from 'axios';
import { refreshToken } from './auth';
import { useAuth } from './authContext';

const API_URL = 'http://localhost:8000';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

const setupInterceptors = (accessToken, saveAccessToken) => {
    api.interceptors.request.use(
        async (config) => {
            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const { data } = await refreshToken();
                    saveAccessToken(data.access_token);
                    originalRequest.headers['Authorization'] = `Bearer ${data.access_token}`;
                    return api(originalRequest);
                } catch (err) {
                    return Promise.reject(err);
                }
            }

            return Promise.reject(error);
        }
    );
};

export { api, setupInterceptors };
