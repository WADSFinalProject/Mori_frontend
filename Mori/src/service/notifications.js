
import { host } from "./config";
import { api } from '../contexts/api';



export const getNotifications = async () => {
    try {
        return api.get(host + "/secured/notifications", );
    } catch (error) {
        console.log("Error getting notifications: ", error);
        throw new Error(error);
    }
};