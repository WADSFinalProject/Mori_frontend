
import { host } from "./config";
import { api } from '../contexts/api';



export const getAllStockDetails = async () => {
    try {
        return api.get(host + "/secured/stocks");
    } catch (error) {
        console.log("Error getting stock details: ", error);
        throw new Error(error);
    }
};

export const getStockDetail = async (location_id) => {
    try {
        return api.get(host + `/secured/stocks/${location_id}`);
    } catch (error) {
        console.log("Error getting stock detail: ", error);
        throw new Error(error);
    }
};