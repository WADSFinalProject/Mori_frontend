
import { api } from '../contexts/api';



export const addFlouringMachine = async (centraId, capacity, status, duration) => {
    try {
        const machineDetails = {
            CentraID: centraId,
            Capacity: capacity,
            Status: status,
            Duration: duration, // Ensure this matches the expected format
        };

        return api.post( "/secured/flouring-machine/create/", machineDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error adding flouring machine: ", error);
        throw new Error(error);
    }
};

export const readFlouringMachineStatus = async (machineId) => {
    try {
        return api.get( `/secured/flouring_machines/${machineId}/status`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error reading flouring machine status: ", error);
        throw new Error(error);
    }
};

export const readFlouringMachines = async (skip = 0, limit = 100) => {
    try {
        return api.get( "/secured/flouring_machines/", {
            params: {
                skip: skip,
                limit: limit,
            },
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error reading flouring machines: ", error);
        throw new Error(error);
    }
};


export const getFlouringMachines_byCentra = async (centraId) => {
    try {
        return api.get( `/flouring_machines/centra/${centraId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error reading flouring machines: ", error);
        throw new Error(error);
    }
};

export const startFlouringMachine = async (machineId) => {
    try {
        return api.post( `/secured/flouring_machines/${machineId}/start`, {}, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error starting flouring machine: ", error);
        throw new Error(error);
    }
};



export const stopFlouringMachine = async (machineId) => {
    try {
        return api.post( `/secured/flouring_machines/${machineId}/stop`, {}, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error stopping flouring machine: ", error);
        throw new Error(error);
    }
};

export const deleteFlouringMachine = async (machineId) => {
    try {
        return api.delete( `/secured/flouring-machine/${machineId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error deleting flouring machine: ", error);
        throw new Error(error);
    }
};

// export const updateFlouringMachine = async (machineId, updateData) => {
//     try {
//         return api.put( `/secured/flouring_machines/${machineId}`, updateData, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//     } catch (error) {
//         console.log("Error updating flouring machine: ", error);
//         throw new Error(error);
//     }
// };

export const updateFlouringMachineStatus = async (MachineID, new_status) => {
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

"/flouringmachine/{machine_id}/status"