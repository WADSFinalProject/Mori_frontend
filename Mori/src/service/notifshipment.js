import axios from "axios";
import { host } from "./config";

axios.defaults.withCredentials = true;

export const getExpeditionNotifications = async () => {
    try {
        const response = await axios.get(`${host}/secured/expedition_notifications/`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.log("Error getting expedition notifications: ", error);
        throw new Error(error);
    }
};
