import axios from "axios";

axios.defaults.withCredentials = true

export const startMachine = async (machineId) => {
    try {
        return axios.post(`https://mori-backend.vercel.app/secured/drying_machines/${machineId}/start`, {}, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error starting machine: ", error);
        throw new Error(error);
    }
};

export const stopMachine = async (machineId) => {
    try {
        return axios.post(`https://mori-backend.vercel.app/secured/drying_machines/${machineId}/stop`, {}, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error stopping machine: ", error);
        throw new Error(error);
    }
};

export const readMachineStatus = async (machineId) => {
    try {
        return axios.get(`https://mori-backend.vercel.app/secured/drying_machines/${machineId}/status`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error reading machine status: ", error);
        throw new Error(error);
    }
};

export const readFlouringMachineStatus = async (machineId) => {
    try {
        return axios.get(`https://mori-backend.vercel.app/secured/flouring_machines/${machineId}/status`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error reading flouring machine status: ", error);
        throw new Error(error);
    }
};

export const startFlouringMachine = async (machineId) => {
    try {
        return axios.post(`https://mori-backend.vercel.app/secured/flouring_machines/${machineId}/start`, {}, {
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
        return axios.post(`https://mori-backend.vercel.app/secured/flouring_machines/${machineId}/stop`, {}, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error stopping flouring machine: ", error);
        throw new Error(error);
    }
};