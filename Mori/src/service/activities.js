import axios from "axios";

axios.defaults.withCredentials = true

export const getDriedDate = async (dryingId) => {
    try {
        return axios.get(`http://localhost:8000/secured/drying-activities/${dryingId}/date`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error getting dried date: ", error);
        throw new Error(error);
    }
};

export const getFlouredDate = async (flouringId) => {
    try {
        return axios.get(`http://localhost:8000/secured/flouring-activities/${flouringId}/date`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error getting floured date: ", error);
        throw new Error(error);
    }
};