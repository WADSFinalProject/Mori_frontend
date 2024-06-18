import axios from "axios";
import { host } from "./config";

axios.defaults.withCredentials = true

export const getAllCentras = async () => {
    try {
        return axios.get(host + "/secured/centras", {
            headers: {
                "Content-Type": "application/json",
            },
        });
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

        return axios.post(host + "/secured/centras", centraDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error creating centra: ", error);
        throw new Error(error);
    }
};

export const getCentraDetails = async (centra_id) => {
    try {
        return await axios.get(host + `/secured/centras/${centra_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
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

        return await axios.put(host + `/secured/centras/${centra_id}`, centraDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error updating centra details: ", error);
        throw new Error(error);
    }
};

export const deleteCentra = async (centra_id) => {
    try {
        return await axios.delete(host + `/secured/centras/${centra_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error deleting centra: ", error);
        throw new Error(error);
    }
};

export const getLeavesData = async (centralId) => {
    try {
        return axios.get(`${host}/secured/leaves`, {
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