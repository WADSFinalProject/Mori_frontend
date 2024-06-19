
import { api } from '../contexts/api';



export const addShipment = async (batch_id, description, status, weight, issue_description) => {
    try {
        const shipmentDetails = {
            batch_id: batch_id,
            description: description,
            status: status,
            weight: weight,
            issue_description: issue_description,
        };

        return api.post( "/secured/shipments", shipmentDetails);
    } catch (error) {
        console.log("Error adding shipment: ", error);
        throw new Error(error);
    }
};

export const readExpeditions = async (skip = 0, limit = 100) => {
    try {
        return api.get( "/secured/all_expeditions", {
            params: {
                skip: skip,
                limit: limit,
            }})
    } catch (error) {
        console.log("Error reading shipments: ", error);
        throw new Error(error);
    }
};

export const readExpeditionsByCentra = async (centraId, skip = 0, limit = 100) => {
    try {
        return api.get( `/all_expeditions/${centraId}`, {
            params: {
                centraId: centraId,
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

        return api.put( `/secured/shipments/${shipment_id}`, shipmentDetails);
    } catch (error) {
        console.log("Error updating shipment: ", error);
        throw new Error(error);
    }
};

export const getShipmentDetails = async (shipment_id) => {
    try {
        return api.get( `/secured/shipments/${shipment_id}`);
    } catch (error) {
        console.log("Error getting shipment details: ", error);
        throw new Error(error);
    }
};

export const deleteExpedition = async (expedition_id) => {
    try {
        return api.delete( `/secured/expeditions/${expedition_id}`, {
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

        return api.post( `/secured/shipments/${shipment_id}/confirm`, shipmentDetails);
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

        return api.post( `/secured/shipments/${shipment_id}/report`, issueDetails);
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

        return api.put( `/secured/shipments/${shipment_id}/rescale`, weightDetails);
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

        return api.post( "/secured/shipments/schedule-pickup", pickupDetails);
    } catch (error) {
        console.log("Error scheduling pickup: ", error);
        throw new Error(error);
    }
};