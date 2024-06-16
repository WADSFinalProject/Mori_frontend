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

export const addUser = async (newUser) => {
    try {
        const newUserEntry = {
            FirstName: newUser.firstName,
            LastName: newUser.lastName,
            Email: newUser.email,
            Phone: newUser.phone,
            Role: newUser.role,
            BirthDate: newUser.birthdate,
            Address: newUser.address
        };

        return await axios.post(host + "/users", newUserEntry, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error adding user: ", error);
        throw new Error(error);
    }
};