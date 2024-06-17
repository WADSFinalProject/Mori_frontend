import axios from "axios";
import { host } from "./config";

axios.defaults.withCredentials = true;

export const getNotifications = async (centraid) => {
    try {
        return await axios.get(`${host}/secured/notifications/12`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error getting notifications: ", error);
        throw new Error(error);
    }
};

