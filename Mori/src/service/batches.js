
import { host } from "./config";
import { api } from '../contexts/api';


export const createBatch = async (description, dryingID, flouringID, driedDate, flouredDate) => {
    try {
        const batchDetails = {
            Description: description,
            DryingID: dryingID,
            FlouringID: flouringID,
            DriedDate: driedDate,
            FlouredDate: flouredDate,
        };

        return api.post(host + "/secured/batches", batchDetails, );
    } catch (error) {
        console.log("Error creating batch: ", error);
        throw new Error(error);
    }
};

export const readBatches = async (skip = 0, limit = 100) => {
    try {
        return api.get(host + "/secured/batches", {
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
        return api.get(host + `/secured/batches/${batchId}`, );
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

        return api.put(host + `/secured/batches/${batchId}`, batchDetails, );
    } catch (error) {
        console.log("Error updating batch: ", error);
        throw new Error(error);
    }
};

export const deleteBatch = async (batchId) => {
    try {
        return api.delete(host + `/secured/batches/${batchId}`, );
    } catch (error) {
        console.log("Error deleting batch: ", error);
        throw new Error(error);
    }
};