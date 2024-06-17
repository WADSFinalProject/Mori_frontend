import axios from "axios";
import { host } from "./config";

axios.defaults.withCredentials = true

export const getAllHarborGuards = async () => {
    try {
        return await axios.get(host + "/secured/harborguard", {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error getting harbor guards: ", error);
        throw new Error(error);
    }
};

export const addHarborGuard = async (harbourName, location, phone, openingHour, closingHour) => {
    try {
        const guardDetails = {
            HarbourName: harbourName,
            Location: location,
            phone: phone,
            OpeningHour: openingHour,
            ClosingHour: closingHour
        };

        return await axios.post(host + "/secured/harborguard", guardDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error adding harbor guard: ", error);
        throw new Error(error);
    }
};

export const showHarborGuard = async (guard_id) => {
    try {
        return await axios.get(host + `/secured/harborguards/${guard_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(`Error fetching harbor guard ${guard_id}: `, error);
        throw new Error(error);
    }
};

export const modifyHarborGuard = async (id, harbourName, location, phone, openingHour, closingHour) => {
    try {
        const guardDetails = {
            HarbourID: id,
            HarbourName: harbourName,
            Location: location,
            phone: phone,
            OpeningHour: openingHour,
            ClosingHour: closingHour
        };

        return await axios.put(host + `/secured/harborguard/${id}`, guardDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(`Error modifying harbor guard ${guard_id} details: `, error);
        throw new Error(error);
    }
};

export const removeHarborGuard = async (guard_id) => {
    try {
        return await axios.delete(host + `/secured/harborguard/${guard_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(`Error removing harbor guard ${guard_id}: `, error);
        throw new Error(error);
    }
};