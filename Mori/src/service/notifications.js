import axios from "axios";

axios.defaults.withCredentials = true

export const getNotifications = async () => {
    try {
        return axios.get("https://mori-backend.vercel.app/secured/notifications", {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error getting notifications: ", error);
        throw new Error(error);
    }
};