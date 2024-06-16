
import { host } from "./config";
import { api } from '../contexts/api';



export const createWetLeavesCollection = async (centralId, date, weight, expired, expirationTime) => {
    try {
        const collectionDetails = {
            CentralID: centralId,
            Date: date,
            Weight: weight,
            Expired: expired,
            ExpirationTime: expirationTime,
        };

        return api.post(host + "/secured/wet-leaves-collections", collectionDetails, );
    } catch (error) {
        console.log("Error creating wet leaves collection: ", error);
        throw new Error(error);
    }
};

export const readWetLeavesCollections = async (skip = 0, limit = 100) => {
    try {
        return api.get(host + "/secured/wet-leaves-collections", {
            params: {
                skip: skip,
                limit: limit,
            },
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error reading wet leaves collections: ", error);
        throw new Error(error);
    }
};

export const readWetLeavesCollection = async (wetLeavesBatchId) => {
    try {
        return api.get(host + `/secured/wet-leaves-collections/${wetLeavesBatchId}`, );
    } catch (error) {
        console.log("Error reading wet leaves collection: ", error);
        throw new Error(error);
    }
};

export const updateWetLeavesCollection = async (wetLeavesBatchId, date, weight, expired, expirationTime) => {
    try {
        const collectionDetails = {
            Date: date,
            Weight: weight,
            Expired: expired,
            ExpirationTime: expirationTime,
        };

        return api.put(host + `/secured/wet-leaves-collections/${wetLeavesBatchId}`, collectionDetails, );
    } catch (error) {
        console.log("Error updating wet leaves collection: ", error);
        throw new Error(error);
    }
};

export const deleteWetLeavesCollection = async (wetLeavesBatchId) => {
    try {
        return api.delete(host + `/secured/wet-leaves-collections/${wetLeavesBatchId}`);
    } catch (error) {
        console.log("Error deleting wet leaves collection: ", error);
        throw new Error(error);
    }
};