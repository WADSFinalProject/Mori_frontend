import axios from "axios";
import { host } from "./config";

axios.defaults.withCredentials = true

export const getNotifications = async () => {
    try {
        return axios.get(host + "/secured/notifications", {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error getting notifications: ", error);
        throw new Error(error);
    }
};