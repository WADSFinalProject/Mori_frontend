import axios from 'axios';
import { host } from './config';

axios.defaults.withCredentials = true;

export const getUserCentra = async (skip = 0, limit = 100) => {
    try {
        return axios.get(`${host}/secured/usercentra/`, {
            params: { skip, limit },
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error getting user centra: ", error);
        throw new Error(error);
    }
};

export const getUserCentraById = async (userCentraId) => {
    try {
        return axios.get(`${host}/secured/usercentra/${userCentraId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error getting user centra by ID: ", error);
        throw new Error(error);
    }
};

export const getUserCentraByUser = async (userId) => {
    try {
        return axios.get(`${host}/secured/usercentra/by-user/${userId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error getting user centra by ID: ", error);
        throw new Error(error);
    }
};

export const addUserCentra = async (centraID, userID, active) => {
    try {
        const userCentraDetails = {
            CentraID: centraID,
            userID: userID,
            Active: active,
        };

        return axios.post(`${host}/secured/usercentra/`, userCentraDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error adding user centra: ", error);
        throw new Error(error);
    }
};

export const updateUserCentra = async (userCentraId, centraID, userID, active) => {
    try {
        const userCentraDetails = {
            CentraID: centraID,
            userID: userID,
            Active: active,
        };

        return axios.patch(`${host}/secured/usercentra/${userCentraId}`, userCentraDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error updating user centra: ", error);
        throw new Error(error);
    }
};

export const deleteUserCentra = async (userCentraId) => {
    try {
        return axios.delete(`${host}/secured/usercentra/${userCentraId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error deleting user centra: ", error);
        throw new Error(error);
    }
};
