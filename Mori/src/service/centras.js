
import { api } from '../contexts/api';



export const getAllCentras = async () => {
    try {
        return api.get( "/secured/centras", );
    } catch (error) {
        console.log("Error getting centras: ", error);
        throw new Error(error);
    }
};

export const createCentra = async (address) => {
    try {
        const centraDetails = {
            Address: address,
        };

        return api.post( "/secured/centras", centraDetails, );
    } catch (error) {
        console.log("Error creating centra: ", error);
        throw new Error(error);
    }
};

export const getCentraDetails = async (centra_id) => {
    try {
        return await api.get( `/secured/centras/${centra_id}`, );
    } catch (error) {
        console.error("Error getting centra details: ", error);
        throw new Error(error);
    }
};

export const updateCentraDetails = async (centra_id, address) => {
    try {
        const centraDetails = {
            Address: address,
        };

        return await api.put( `/secured/centras/${centra_id}`, centraDetails, );
    } catch (error) {
        console.error("Error updating centra details: ", error);
        throw new Error(error);
    }
};

export const deleteCentra = async (centra_id) => {
    try {
        return await api.delete( `/secured/centras/${centra_id}`, );
    } catch (error) {
        console.error("Error deleting centra: ", error);
        throw new Error(error);
    }
};

export const getLeavesData = async (centralId) => {
    try {
        return api.get(`/secured/leaves`, {
            params: {
                centra_id: centralId,
            },
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error retrieving leaves data: ", error);
        throw new Error(error);
    }
};