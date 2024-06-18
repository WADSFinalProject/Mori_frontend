import axios from "axios";
import { host } from "./config";

axios.defaults.withCredentials = true;

export const getNotificationsbycenid = async (centraid) => {
    try {
        return await axios.get(`${host}/secured/notifications/${centraid}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error getting notifications: ", error);
        throw new Error(error);
    }
};


export const getNotifications = async (skip = 0, limit = 100) => {
    try {
        const response = await axios.get(`${host}/secured/notifications/`, {
            params: {
                skip: skip,
                limit: limit
            },
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error getting notifications: ", error);
        throw new Error(error);
    }
};
