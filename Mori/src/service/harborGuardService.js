
import { host } from "./config";
import { api } from '../contexts/api';



export const getAllHarborGuards = async () => {
    try {
        return await api.get(host + "/secured/harborguards", );
    } catch (error) {
        console.error("Error getting harbor guards: ", error);
        throw new Error(error);
    }
};

export const addHarborGuard = async (PIC_name, email, phone) => {
    try {
        const guardDetails = {
            PIC_name: PIC_name,
            email: email,
            phone: phone,
        };

        return await api.post(host + "/secured/harborguards", guardDetails, );
    } catch (error) {
        console.error("Error adding harbor guard: ", error);
        throw new Error(error);
    }
};

export const showHarborGuard = async (guard_id) => {
    try {
        return await api.get(host + `/secured/harborguards/${guard_id}`, );
    } catch (error) {
        console.error(`Error fetching harbor guard ${guard_id}: `, error);
        throw new Error(error);
    }
};

export const modifyHarborGuard = async (guard_id, PIC_name, email, phone) => {
    try {
        const guardDetails = {
            PIC_name: PIC_name,
            email: email,
            phone: phone,
        };

        return await api.put(host + `/secured/harborguards/${guard_id}`, guardDetails, );
    } catch (error) {
        console.error(`Error modifying harbor guard ${guard_id} details: `, error);
        throw new Error(error);
    }
};

export const removeHarborGuard = async (guard_id) => {
    try {
        return await api.delete(host + `/secured/harborguards/${guard_id}`, );
    } catch (error) {
        console.error(`Error removing harbor guard ${guard_id}: `, error);
        throw new Error(error);
    }
};