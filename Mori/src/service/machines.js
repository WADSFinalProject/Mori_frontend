
import { host } from "./config";
import { api } from '../contexts/api';



export const startMachine = async (machineId) => {
    try {
        return api.post(host + `/secured/drying_machines/${machineId}/start`, {}, );
    } catch (error) {
        console.log("Error starting machine: ", error);
        throw new Error(error);
    }
};

export const stopMachine = async (machineId) => {
    try {
        return api.post(host + `/secured/drying_machines/${machineId}/stop`, {}, );
    } catch (error) {
        console.log("Error stopping machine: ", error);
        throw new Error(error);
    }
};

export const readMachineStatus = async (machineId) => {
    try {
        return api.get(host + `/secured/drying_machines/${machineId}/status`, );
    } catch (error) {
        console.log("Error reading machine status: ", error);
        throw new Error(error);
    }
};

export const readFlouringMachineStatus = async (machineId) => {
    try {
        return api.get(host + `/secured/flouring_machines/${machineId}/status`, );
    } catch (error) {
        console.log("Error reading flouring machine status: ", error);
        throw new Error(error);
    }
};

export const startFlouringMachine = async (machineId) => {
    try {
        return api.post(host + `/secured/flouring_machines/${machineId}/start`, {}, );
    } catch (error) {
        console.log("Error starting flouring machine: ", error);
        throw new Error(error);
    }
};

export const stopFlouringMachine = async (machineId) => {
    try {
        return api.post(host + `/secured/flouring_machines/${machineId}/stop`, {}, );
    } catch (error) {
        console.log("Error stopping flouring machine: ", error);
        throw new Error(error);
    }
};