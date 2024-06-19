
import { api } from '../contexts/api';




export const getNotifications = async () => {
    try {
        return api.get( "/secured/notifications", );
    } catch (error) {
        console.log("Error getting notifications: ", error);
        throw new Error(error);
    }
};