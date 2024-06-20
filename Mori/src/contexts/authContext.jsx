import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
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
        setUserRole(decoded.role);
    };

    const refreshAccessToken = async () => {
        try {
            const response = await axios.post(`${API_URL}/token/refresh`, {}, {
                withCredentials: true,
            });
            const newAccessToken = response.data.access_token;
            saveAccessToken(newAccessToken);
            return newAccessToken;
        } catch (error) {
            console.log("Error refreshing token: ", error);
            toast.error("Session expired. Please log in again.", { position: "top-center" });
            navigate('/');
            throw error;
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            refreshAccessToken();
        }, 4 * 60 * 1000); // Refresh the token every 4 minutes

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
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
