import axios from "axios";
import { host } from "./config";

axios.defaults.withCredentials = true

export const getAllUsers = async () => {
    try {
        return axios.get(host + "/secured/users", {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error getting centras: ", error);
        throw new Error(error);
    }
};