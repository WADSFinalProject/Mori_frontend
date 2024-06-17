import axios from "axios";
import { host } from "./config";

axios.defaults.withCredentials = true

export const addShipment = async (batch_id, description, status, weight, issue_description) => {
    try {
        const shipmentDetails = {
            batch_id: batch_id,
            description: description,
            status: status,
            weight: weight,
            issue_description: issue_description,
        };

        return axios.post(host + "/secured/shipments", shipmentDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error adding shipment: ", error);
        throw new Error(error);
    }
};

export const readExpeditions = async (skip = 0, limit = 100) => {
    try {
        return axios.get(host + "/secured/all_expeditions", {
            params: {
                skip: skip,
                limit: limit,
            },
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error reading shipments: ", error);
        throw new Error(error);
    }
};

export const readExpeditionsByCentra = async (centraId, skip = 0, limit = 100) => {
    try {
        return axios.get(host + `/all_expeditions/${centraId}`, {
            params: {
                centraId : centraId,
                skip: skip,
                limit: limit,
            },
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error reading shipments: ", error);
        throw new Error(error);
    }
};






export const updateShipment = async (shipment_id, batch_id, description, status, weight, issue_description) => {
    try {
        const shipmentDetails = {
            shipment_id: shipment_id,
            batch_id: batch_id,
            description: description,
            status: status,
            weight: weight,
            issue_description: issue_description,
        };

        return axios.put(host + `/secured/shipments/${shipment_id}`, shipmentDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error updating shipment: ", error);
        throw new Error(error);
    }
};

export const getShipmentDetails = async (shipment_id) => {
    try {
        return axios.get(host + `/secured/shipments/${shipment_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error getting shipment details: ", error);
        throw new Error(error);
    }
};

export const deleteShipment = async (shipment_id) => {
    try {
        return axios.delete(host + `/secured/shipments/${shipment_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error deleting shipment: ", error);
        throw new Error(error);
    }
};

export const confirmShipmentArrival = async (shipment_id, weight) => {
    try {
        const shipmentDetails = {
            weight: weight,
        };

        return axios.post(host + `/secured/shipments/${shipment_id}/confirm`, shipmentDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error confirming shipment arrival: ", error);
        throw new Error(error);
    }
};

export const reportShipmentIssue = async (shipment_id, description) => {
    try {
        const issueDetails = {
            description: description,
        };

        return axios.post(host + `/secured/shipments/${shipment_id}/report`, issueDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error reporting shipment issue: ", error);
        throw new Error(error);
    }
};

export const rescaleShipment = async (shipment_id, new_weight) => {
    try {
        const weightDetails = {
            new_weight: new_weight,
        };

        return axios.put(host + `/secured/shipments/${shipment_id}/rescale`, weightDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error rescaling shipment: ", error);
        throw new Error(error);
    }
};

export const schedulePickup = async (pickup_time, location) => {
    try {
        const pickupDetails = {
            pickup_time: pickup_time,
            location: location,
        };

        return axios.post(host + "/secured/shipments/schedule-pickup", pickupDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error scheduling pickup: ", error);
        throw new Error(error);
    }
};