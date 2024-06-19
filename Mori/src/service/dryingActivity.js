import axios from 'axios';
import { host } from "./config";

axios.defaults.withCredentials = true;

export const addDryingActivity = async (weight, dryingMachineID, duration) => {
    try {
        const currentTime = new Date();
        const dryingActivityDetails = {
            Weight: weight,
            DryingMachineID: dryingMachineID,
            EndTime: new Date(currentTime.getTime() + duration * 1000).toISOString(), // Calculate EndTime using duration
        };

        console.log("Sending drying activity details:", dryingActivityDetails);

        return await axios.post(`${host}/secured/drying_activity/create`, dryingActivityDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error adding drying activity: ", error.response?.data || error.message);
        throw new Error(error);
    }
};

export const getAllDryingActivities = async (skip = 0, limit = 100) => {
    try {
        return await axios.get(`${host}/secured/drying_activity/`, {
            params: { skip, limit },
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error fetching drying activities: ", error);
        throw new Error(error);
    }
};

export const getDryingActivityById = async (dryingID) => {
    try {
        return await axios.get(`${host}/secured/drying-activities/${dryingID}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log(`Error fetching drying activity with ID ${dryingID}: `, error);
        throw new Error(error);
    }
};

export const updateDryingActivity = async (dryingID, centralID, weight, dryingMachineID, time) => {
    try {
        const dryingActivityDetails = {
            CentralID: centralID,
            Weight: weight,
            DryingMachineID: dryingMachineID,
            Time: time,
        };

        return await axios.put(`${host}/secured/drying-activities/${dryingID}`, dryingActivityDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log(`Error updating drying activity with ID ${dryingID}: `, error);
        throw new Error(error);
    }
};


export const getDryingActivity_Bymachine = async (machineID) => {
    try {
        return await axios.get(`${host}/secured/drying-activities/machine/${machineID}`, {
            params: {
                machineID
            },
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log(`Error: `, error);
        throw new Error(error);
    }
};


export const deleteDryingActivity = async (dryingID) => {
    try {
        return await axios.delete(`${host}/secured/drying-activities/${dryingID}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log(`Error deleting drying activity with ID ${dryingID}: `, error);
        throw new Error(error);
    }
};