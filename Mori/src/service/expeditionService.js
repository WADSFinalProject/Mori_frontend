import axios from "axios";

axios.defaults.withCredentials = true

export const createExpedition = async (estimatedArrival, totalPackages, expeditionDate, expeditionServiceDetails, destination, centralID) => {
    try {
        const expeditionDetails = {
            EstimatedArrival: estimatedArrival,
            TotalPackages: totalPackages,
            ExpeditionDate: expeditionDate,
            ExpeditionServiceDetails: expeditionServiceDetails,
            Destination: destination,
            CentralID: centralID
        };

        return await axios.post("https://mori-backend.vercel.app/secured/expeditions", expeditionDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error creating expedition: ", error);
        throw new Error(error);
    }
};

export const readExpeditions = async (skip = 0, limit = 100) => {
    try {
        const params = {
            skip: skip,
            limit: limit
        };

        return await axios.get("https://mori-backend.vercel.app/secured/expeditions", {
            headers: {
                "Content-Type": "application/json",
            },
            params: params
        });
    } catch (error) {
        console.error("Error reading expeditions: ", error);
        throw new Error(error);
    }
};

export const getExpeditionDetails = async (expedition_id) => {
    try {
        return await axios.get(`https://mori-backend.vercel.app/secured/expeditions/${expedition_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(`Error getting details of expedition ${expedition_id}: `, error);
        throw new Error(error);
    }
};

export const updateExpedition = async (expedition_id, estimatedArrival, totalPackages, expeditionDate, expeditionServiceDetails, destination, centralID) => {
    try {
        const expeditionDetails = {
            EstimatedArrival: estimatedArrival,
            TotalPackages: totalPackages,
            ExpeditionDate: expeditionDate,
            ExpeditionServiceDetails: expeditionServiceDetails,
            Destination: destination,
            CentralID: centralID
        };

        return await axios.put(`https://mori-backend.vercel.app/secured/expeditions/${expedition_id}`, expeditionDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(`Error updating expedition ${expedition_id}: `, error);
        throw new Error(error);
    }
};

export const deleteExpedition = async (expedition_id) => {
    try {
        return await axios.delete(`https://mori-backend.vercel.app/secured/expeditions/${expedition_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(`Error deleting expedition ${expedition_id}: `, error);
        throw new Error(error);
    }
};