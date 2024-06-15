import axios from "axios";
import { host } from "./config";


export const registerUser = async (userDetails) => {
    try {
        const { IDORole, Email, FullName, Role, Phone } = userDetails;

        const newUser = {
            IDORole,
            Email,
            FullName,
            Role,
            Phone,
        };

        return axios.post(host + "/users/register", newUser, );
    } catch (error) {
        console.log("Error registering user: ", error);
        throw new Error(error);
    }
};

export const validateToken = async (token) => {
    try {
        return axios.get(host + `/users/validate-link`, {
            params: {
                token: token
            },
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error validating token: ", error);
        throw new Error(error);
    }
};

export const setPassword = async (token, newPassword) => {
    try {
        const passwordDetails = {
            token: token,
            new_password: newPassword,
        };

        return axios.post(host + "/users/setpassword", passwordDetails, );
    } catch (error) {
        console.log("Error setting password: ", error);
        throw new Error(error);
    }
};

export const resetPasswordOTP = async (email) => {
    try {
        const payload = {
            email: email
        }

        return axios.post(host + "/users/resetpassword-OTP?email=" + email, );
    } catch (error) {
        console.log("Error validating email for OTP : ", error)
        throw new Error(error)
    }
}

export const resetPasswordVerification = (email, code) => {
    try {
        const payload = {
            Email: email,
            Code: code
        }

        return axios.post(host + "/users/verify-reset", payload, );
    } catch (error) {
        console.log("Reset Verification Error : ", error)
        throw new Error(error)
    }
}

export const ResetPassword = (email, new_password) => {
    try {
        const payload = {
            Email: email,
            new_password: new_password
        };

        return axios.put(host + "/users/resetpassword", payload, );
    } catch (error) {
        console.log("Reset-password Error : ", error)
        throw new Error(error)
    }
}

export const loginUser = async (email, password) => {
    try {
        const loginDetails = {
            Email: email,
            Password: password,
        };

        return axios.post(host + "/users/login", loginDetails, );
    } catch (error) {
        console.log("Error logging in: ", error);
        throw new Error(error);
    }
};

export const verifyUser = async (email, code) => {
    try {
        const verificationDetails = {
            Email: email,
            Code: code,
        };

        return axios.post(host + "/users/verify", verificationDetails, {
            headers: {
                "Content-Type": "application/json",
            },  withCredentials: true
        })
    } catch (error) {
        console.log("Error verifying user: ", error);
        throw new Error(error);
    }
};

// export const refreshToken = async () => {
//     try {
//         return axios.post(host + "/token/refresh", {}, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             withCredentials: true,
//         });
//     } catch (error) {
//         console.log("Error refreshing token: ", error);
//         throw new Error(error);
//     }
// };

// export const refreshAccessToken = async () => {

//     try{
//         const response = await axios.post(host + `/token/refresh`, {}, { withCredentials: true });
//         accessToken = response.data.access_token;
//         return accessToken;
//     } catch(error){
//               console.log("Error refreshing token: ", error);
//         throw new Error(error);
//     }
// };

export const logout = async () => {
    await axios.post(`${API_URL}/users/logout`, {}, { withCredentials: true });
    accessToken = null;
};

export const resendCode = async () => {
    try {
        return axios.post(host + "/users/resend_code", {}, );
    } catch (error) {
        console.log("Error resending code: ", error);
        throw new Error(error);
    }
};

export const logoutUser = async () => {
    try {
        return axios.post(host + "/users/logout", {}, );
    } catch (error) {
        console.log("Error logging out: ", error);
        throw new Error(error);
    }
};

export const accessProtectedRoute = async () => {
    try {
        return axios.get(host + "/secured/protected-route", );
    } catch (error) {
        console.log("Error accessing protected route: ", error);
        throw new Error(error);
    }
};