
import { host } from "./config";
import { api } from '../contexts/api';



export const getAllUsers = async () => {
    try {
        return api.get(host + "/secured/users");
    } catch (error) {
        console.log("Error getting centras: ", error);
        throw new Error(error);
    }
};