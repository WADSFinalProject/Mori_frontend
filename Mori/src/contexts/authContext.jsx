import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:8000';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    const saveAccessToken = (token) => {
        setAccessToken(token);
        const decoded = jwtDecode(token);
        setUserRole(decoded.role); // Ensure your token actually includes a 'role' claim
    };

    const refreshAccessToken = async () => {
        try {
            const response = await axios.post("http://localhost:8000/token/refresh", {}, {
                withCredentials: true,
            });
            const newAccessToken = response.data.access_token;
            saveAccessToken(newAccessToken);
            return newAccessToken; // Return new token for interceptor to use
        } catch (error) {
            console.log("Error refreshing token: ", error);
            toast.error("Session expired. Please log in again.", { position: "top-center" });
            navigate('/');
            throw error; // Rethrow to handle by interceptor
        }
    };

    useEffect(() => {
        // Call setupInterceptors from here once we define it in api.js
        import('./api').then(apiModule => {
            apiModule.setupInterceptors(accessToken, saveAccessToken, refreshAccessToken);
        });
    }, [accessToken]);

    return (
        <AuthContext.Provider value={{ accessToken, userRole, saveAccessToken, refreshAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
