// import api from "../contexts/api";
// import { host } from "./config";

import { api } from '../contexts/api';

export const getConvertionRate = async (centraId) => {
    try {
        return api.get(`/secured/conversion_rates/${centraId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error getting centras: ", error);
        throw new Error(error);
    }
};