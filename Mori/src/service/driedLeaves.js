
import { api } from '../contexts/api';




export const createDriedLeaf = async (centralId, weight, driedDate, floured, inMachine) => {
    try {
        const leafDetails = {
            CentraID: centralId,
            Weight: weight,
            DriedDate: driedDate,
            Floured: floured,
            InMachine: inMachine,
        };

        return await api.post( "/secured/dried_leaves/", leafDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error creating dried leaf:", error);
        if (error.response) {
            console.log("Response data:", error.response.data);
        }
        throw new Error(error);
    }
};



export const readDriedLeaves = async (skip = 0, limit = 100) => {
    try {
        return api.get( "/secured/dried_leaves/", {
            params: {
                skip: skip,
                limit: limit,
            },
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error reading dried leaves: ", error);
        throw new Error(error);
    }
};

export const readDriedLeaf = async (leafId) => {
    try {
        return api.get( `/secured/dried_leaves/${leafId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error reading dried leaf: ", error);
        throw new Error(error);
    }
};

export const updateDriedLeaf = async (leafId, centralId, weight, driedDate, floured) => {
    try {
        const leafDetails = {
            CentralID: centralId,
            Weight: weight,
            DriedDate: driedDate,
            Floured: floured,
        };

        return api.put( `/secured/dried_leaves/${leafId}`, leafDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error updating dried leaf: ", error);
        throw new Error(error);
    }
};

export const deleteDriedLeaf = async (leafId) => {
    try {
        return api.delete( `/secured/dried_leaves/${leafId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error deleting dried leaf: ", error);
        throw new Error(error);
    }
};

export const getdryingConversion = async (centraId) =>  {
    try {
        return api.get( `/secured/dried_leaves/conversion`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error retrieving conversion rate: ", error);
        throw new Error(error);
    }
};
