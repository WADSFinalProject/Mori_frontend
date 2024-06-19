
import { api } from '../contexts/api';



export const addDryingMachine = async (centraId, capacity, status, duration) => {
    try {
        const machineDetails = {
            CentraID: centraId,
            Capacity: capacity,
            Status: status,
            Duration: duration, // Ensure this matches the expected format
        };

        return api.post( "/secured/drying-machine/create/", machineDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error adding drying machine: ", error);
        throw new Error(error);
    }
};

export const readDryingMachineStatus = async (machineId) => {
    try {
        return api.get( `/secured/drying_machines/${machineId}/status`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error reading drying machine status: ", error);
        throw new Error(error);
    }
};

export const readDryingMachines = async (skip = 0, limit = 100) => {
    try {
        return api.get( "/secured/drying_machines/", {
            params: {
                skip: skip,
                limit: limit,
            },
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error reading drying machines: ", error);
        throw new Error(error);
    }
};

export const readDryingMachine = async (machineId) => {
    try {
        return api.get( `/secured/drying_machine/${machineId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error reading drying machine: ", error);
        throw new Error(error);
    }
};

export const startDryingMachine = async (machineId) => {
    try {
        return api.post( `/secured/drying_machines/${machineId}/start`, {}, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error starting drying machine: ", error);
        throw new Error(error);
    }
};

export const stopDryingMachine = async (machineId) => {
    try {
        return api.post( `/secured/drying_machines/${machineId}/stop`, {}, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error stopping drying machine: ", error);
        throw new Error(error);
    }
};

export const deleteDryingMachine = async (machineId) => {
    try {
        return api.delete( `/secured/drying-machine/${machineId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error deleting drying machine: ", error);
        throw new Error(error);
    }
};


export const getDryingMachine_byCentra = async (centraId) => {
    try {
        return api.post( `/secured//drying_machines/centra/${centraId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error getting drying amchine by centra: ", error);
        throw new Error(error);
    }
};


export const updateDryingMachineStatus = async (MachineID, new_status) => {
    try {
        return api.get( `/secured/dryingmachine/${MachineID}/status`, {
            params: {
                status: new_status
            },
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error reading drying machines: ", error);
        throw new Error(error);
    }
};

