i
import { api } from '../contexts/api';



export const getDriedDate = async (dryingId) => {
    try {
        return api.get(`/secured/drying-activities/${dryingId}/date`, );
    } catch (error) {
        console.log("Error getting dried date: ", error);
        throw new Error(error);
    }
};

export const getFlouredDate = async (flouringId) => {
    try {
        return api.get(`/secured/flouring-activities/${flouringId}/date`, );
    } catch (error) {
        console.log("Error getting floured date: ", error);
        throw new Error(error);
    }
};