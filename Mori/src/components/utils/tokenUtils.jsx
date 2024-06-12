// // tokenUtils.js
// import axios from 'axios';

// let accessToken = null;

// const getAccessToken = () => accessToken;
// const setAccessToken = (token) => {
//   accessToken = token;
// };
// const clearAccessToken = () => {
//   accessToken = null;
// };

// const refreshAccessToken = async () => {
//   try {
//     const response = await axios.post('http://localhost:8000/token/refresh', {}, { withCredentials: true });
//     setAccessToken(response.data.access_token);
//     return response.data.access_token;
//   } catch (error) {
//     console.error('Failed to refresh access token', error);
//     clearAccessToken();
//     throw error;
//   }
// };

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8000',
//   withCredentials: true,
// });

// axiosInstance.interceptors.request.use(
//   async (config) => {
//     let token = getAccessToken();
//     if (!token) {
//       token = await refreshAccessToken();
//     }
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const token = await refreshAccessToken();
//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export { axiosInstance, setAccessToken, clearAccessToken, getAccessToken, refreshAccessToken };
