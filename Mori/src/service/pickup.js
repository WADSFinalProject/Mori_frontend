
import { api } from '../contexts/api';




export const createPickup = async (xyzID, expeditionID, warehouseID, pickupTime) => {
    try {
        const pickupDetails = {
            xyzID: xyzID,
            expeditionID: expeditionID,
            warehouseID: warehouseID,
            pickup_time: pickupTime, // Ensure this matches the expected format
        };

        return api.post( "/secured/pickup/", pickupDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error creating pickup: ", error);
        throw new Error(error);
    }
};

export const readPickup = async (pickupId) => {
    try {
        return api.get( `/secured/pickup/${pickupId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error reading pickup: ", error);
        throw new Error(error);
    }
};

export const readPickups = async (skip = 0, limit = 100) => {
    try {
        return api.get( "/secured/pickup/", {
            params: {
                skip: skip,
                limit: limit,
            },
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error reading pickups: ", error);
        throw new Error(error);
    }
};

export const updatePickup = async (pickupId, xyzID, expeditionID, warehouseID, pickupTime) => {
    try {
        const pickupDetails = {
            xyzID: xyzID,
            expeditionID: expeditionID,
            warehouseID: warehouseID,
            pickup_time: pickupTime, // Ensure this matches the expected format
        };

        return api.put( `/secured/pickup/${pickupId}`, pickupDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error updating pickup: ", error);
        throw new Error(error);
    }
};

export const deletePickup = async (pickupId) => {
    try {
        return api.delete( `/secured/pickup/${pickupId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error deleting pickup: ", error);
        throw new Error(error);
    }
};
