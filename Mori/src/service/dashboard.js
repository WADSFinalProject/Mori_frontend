import axios from "axios";
import { host } from "./config";

axios.defaults.withCredentials = true

export const getConvertionRate = async (centraId) => {
    try {
        return axios.get(`${host}/secured/conversion_rates/${centraId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error getting centras: ", error);
        throw new Error(error);
    }
};