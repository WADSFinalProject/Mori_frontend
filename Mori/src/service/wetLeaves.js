
import { host } from "./config";
import { api } from '../contexts/api';



export const createWetLeavesCollection = async (centralId, date, time, weight, status, expired, dried) => {
    try {
        const collectionDetails = {
            CentralID: centralId,
            Date: date,
            Time: time,
            Weight: weight,
            Status: status,
            Expired: expired,
            Dried: dried,
            // Duration: duration,
        };

        return axios.post(host + "/secured/wet-leaves-collections/create", collectionDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error creating wet leaves collection: ", error);
        throw new Error(error);
    }
};

export const readWetLeavesCollections = async (skip = 0, limit = 100) => {
    try {
        return axios.get(host + "/secured/wet-leaves-collections/", {
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

export const updateWetLeavesCollection = async (wetLeavesBatchId, date, time, weight, status, expired, dried) => {
    try {
        const collectionDetails = {
            Date: date,
            Time: time,
            Weight: weight,
            Status: status,
            Expired: expired,
            Dried: dried,
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

export const getWetLeavesConversion  = async (centraId) => {
    try {
        return axios.get(host + `/secured/wet-leaves-collections/conversion`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error getting wet leaves conversion rate: ", error);
        throw new Error(error);
    }
};
export const getWetLeavesWeight = async(centraId) => {
    try{
        return axios.get(host +"/wet-leaves-totalWeight/"), {
            headers: {
                "Content-Type": "application/json",
            },
        }
    }catch (error) {
        console.log("Error retrieving weights: ", error);
        throw new Error(error);
    }
};

