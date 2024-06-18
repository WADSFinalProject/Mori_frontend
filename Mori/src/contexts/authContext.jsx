import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getNewAccessToken } from '../service/auth'; // Ensure this path is correct
import { setupInterceptors, getApi } from './api'; // Ensure this path is correct

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  const setToken = (token) => {
    setAccessToken(token);
    setupInterceptors(token, setToken); // Ensure interceptors are set up whenever the token is set
  };

  const getRole = () => {
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      return decodedToken.role;
    }
    return 'guest';
  };

  useEffect(() => {
    const refreshAccessToken = async () => {
      const newAccessToken = await getNewAccessToken();
      if (newAccessToken) {
        setToken(newAccessToken);
      } else {
        setupInterceptors(accessToken, setToken); // Set up interceptors even if there's no new token
      }
    };

    refreshAccessToken();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, setToken, getRole, getApi }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
