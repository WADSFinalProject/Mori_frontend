
import { host } from "./config";
import { api } from '../contexts/api';




export const getLocationDetails = async (location_id) => {
    try {
        return api.get(host + `/secured/location/${location_id}`, );
    } catch (error) {
        console.log("Error getting location details: ", error);
        throw new Error(error);
    }
};

export const getShipmentHistory = async (location_id) => {
    try {
        return api.get(host + `/secured/shipments/${location_id}/history`, );
    } catch (error) {
        console.log("Error getting shipment history: ", error);
        throw new Error(error);
    }
};