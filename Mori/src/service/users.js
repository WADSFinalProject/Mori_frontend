import axios from "axios";
import { host } from "./config";

axios.defaults.withCredentials = true

export const getAllUsers = async (skip = 0, limit = 100, sortBy = 'Name', sortOrder = 'asc', role = '') => {
    try {
        return axios.get(`${host}/secured/users`, {
            params: {
                skip,
                limit,
                sort_by: sortBy,
                sort_order: sortOrder,
                role,
            },
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log("Error getting users: ", error);
        throw new Error(error);
    }
};

export const addNewUser = async (newUser) => {
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

        return axios.post(host + "/secured/users", newUserEntry, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error adding user: ", error);
        throw new Error(error);
    }
};