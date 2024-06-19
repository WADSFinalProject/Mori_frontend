import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode }from 'jwt-decode'; // Ensure the correct import
import { getNewAccessToken } from '../service/auth'; // Ensure this path is correct
import { setupInterceptors, getApi, initializeApi } from './api'; // Ensure this path is correct

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isApiInitialized, setIsApiInitialized] = useState(false);

  const setToken = (token) => {
    setAccessToken(token);
    initializeApi(token, setToken); // Ensure interceptors are set up whenever the token is set
    setIsApiInitialized(true); // Mark the API as initialized
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
        initializeApi(accessToken, setToken); // Set up interceptors even if there's no new token
        setIsApiInitialized(true); // Mark the API as initialized even without a new token
      }
    };

    refreshAccessToken();
  }, []);

  if (!isApiInitialized) {
    return <div>Loading...</div>; // Optionally render a loading state
  }

  return (
    <AuthContext.Provider value={{ accessToken, setToken, getRole, getApi }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
