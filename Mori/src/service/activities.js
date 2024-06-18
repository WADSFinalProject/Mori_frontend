// import api from "api";

import { getApi } from '../contexts/api';
import { host } from "./config";


const api = getApi()
export const getDriedDate = async (dryingId) => {
    try {
        return api.get(host + `/secured/drying-activities/${dryingId}/date`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error getting dried date: ", error);
        throw new Error(error);
    }
};

export const getFlouredDate = async (flouringId) => {
    try {
        return api.get(host + `/secured/flouring-activities/${flouringId}/date`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error getting floured date: ", error);
        throw new Error(error);
    }
};