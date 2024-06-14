import axios from "axios";

axios.defaults.withCredentials = true

export const createBatch = async (description, dryingID, flouringID, driedDate, flouredDate) => {
    try {
        const batchDetails = {
            Description: description,
            DryingID: dryingID,
            FlouringID: flouringID,
            DriedDate: driedDate,
            FlouredDate: flouredDate,
        };

        return axios.post("https://mori-backend.vercel.app/secured/batches", batchDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error creating batch: ", error);
        throw new Error(error);
    }
};

export const readBatches = async (skip = 0, limit = 100) => {
    try {
        return axios.get("https://mori-backend.vercel.app/secured/batches", {
            params: {
                skip: skip,
                limit: limit,
            },
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error reading batches: ", error);
        throw new Error(error);
    }
};

export const readBatch = async (batchId) => {
    try {
        return axios.get(`https://mori-backend.vercel.app/secured/batches/${batchId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error reading batch: ", error);
        throw new Error(error);
    }
};

export const updateBatch = async (batchId, description, flouringID, dryingID) => {
    try {
        const batchDetails = {
            Description: description,
            FlouringID: flouringID,
            DryingID: dryingID,
        };

        return axios.put(`https://mori-backend.vercel.app/secured/batches/${batchId}`, batchDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error updating batch: ", error);
        throw new Error(error);
    }
};

export const deleteBatch = async (batchId) => {
    try {
        return axios.delete(`https://mori-backend.vercel.app/secured/batches/${batchId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error deleting batch: ", error);
        throw new Error(error);
    }
};