import axios from "axios";
import { host } from "./config";

axios.defaults.withCredentials = true

export const addFlouringActivity = async (centralID, date, weight, flouringMachineID, time) => {
    try {
        const flouringActivityDetails = {
            CentralID: centralID,
            Date: date,
            Weight: weight,
            FlouringMachineID: flouringMachineID,
            Time: time,
        };

        return await axios.post(`${host}/secured/flouring_activity/create`, flouringActivityDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error adding flouring activity: ", error);
        throw new Error(error);
    }
};

export const getAllFlouringActivities = async (skip = 0, limit = 100) => {
    try {
        return await axios.get(`${host}/secured/flouring_activity/`, {
            params: { skip, limit },
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error fetching flouring activities: ", error);
        throw new Error(error);
    }
};

export const getFlouringActivityById = async (flouringID) => {
    try {
        return await axios.get(`${host}/secured/flouring_activity/${flouringID}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log(`Error fetching flouring activity with ID ${flouringID}: `, error);
        throw new Error(error);
    }
};

export const updateFlouringActivity = async (flouringID, centralID, date, weight, flouringMachineID, time) => {
    try {
        const flouringActivityDetails = {
            CentralID: centralID,
            Date: date,
            Weight: weight,
            FlouringMachineID: flouringMachineID,
            Time: time,
        };

        return await axios.put(`${host}/secured/flouring_activity/update/${flouringID}`, flouringActivityDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log(`Error updating flouring activity with ID ${flouringID}: `, error);
        throw new Error(error);
    }
};

export const deleteFlouringActivity = async (flouringID) => {
    try {
        return await axios.delete(`${host}/secured/flouring_activity/delete/${flouringID}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log(`Error deleting flouring activity with ID ${flouringID}: `, error);
        throw new Error(error);
    }
};