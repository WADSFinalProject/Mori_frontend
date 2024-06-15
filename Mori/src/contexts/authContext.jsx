import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [userRole, setUserRole] = useState(null);

    const navigate = useNavigate()

    const saveAccessToken = (token) => {
        setAccessToken(token);
        setUserRole(jwtDecode(token).role)
    };
    

    const refreshAccessToken = async (retryCount = 0) => {
        try {
            const response = await axios.post('http://localhost:8000/token/refresh', {}, {
                withCredentials: true,
            });
            setAccessToken(response.data.access_token);
        } catch (error) {
            console.log("Error refreshing token: ", error);
            if (retryCount < 3) {
                toast.info("Attempting to reconnect...",{position: "top-center"});
                setTimeout(() => refreshAccessToken(retryCount + 1), 2000 * (2 ** retryCount));
            } else {
                toast.error("Unable to refresh your session. Taking you back to login page...", {position: "top-center"});
                navigate('/');}
        }
    };

    useEffect(() => {
        refreshAccessToken(); //refresh on initial load to handle page reloads
        const interval = setInterval(refreshAccessToken, 5 * 60 * 1000); // Refresh token every 5 minutes
        return () => clearInterval(interval); //Cleanup interval 
    }, []);


    return (
        <AuthContext.Provider value={{ accessToken, saveAccessToken, refreshAccessToken, userRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
  };
