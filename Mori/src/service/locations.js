import axios from "axios";

axios.defaults.withCredentials = true

export const getLocationDetails = async (location_id) => {
    try {
        return axios.get(`https://mori-backend.vercel.app/secured/location/${location_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error getting location details: ", error);
        throw new Error(error);
    }
};

export const getShipmentHistory = async (location_id) => {
    try {
        return axios.get(`https://mori-backend.vercel.app/secured/shipments/${location_id}/history`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error getting shipment history: ", error);
        throw new Error(error);
    }
};