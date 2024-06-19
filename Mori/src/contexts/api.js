// api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

const setupInterceptors = (accessToken, saveAccessToken, refreshAccessToken) => {
    api.interceptors.request.use(
        config => {
            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            return config;
        },
        error => Promise.reject(error)
    );

    api.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const newAccessToken = await refreshAccessToken();
                    saveAccessToken(newAccessToken);
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
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
