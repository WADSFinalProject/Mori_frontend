import axios from "axios";

axios.defaults.withCredentials = true

export const getAllHarborGuards = async () => {
    try {
        return await axios.get("https://mori-backend.vercel.app/secured/harborguards", {
            headers: {
                "Content-Type": "application/json",
            },
        });
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

        return await axios.post("https://mori-backend.vercel.app/secured/harborguards", guardDetails, {
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
        return await axios.get(`https://mori-backend.vercel.app/secured/harborguards/${guard_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
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

        return await axios.put(`https://mori-backend.vercel.app/secured/harborguards/${guard_id}`, guardDetails, {
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
        return await axios.delete(`https://mori-backend.vercel.app/secured/harborguards/${guard_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(`Error removing harbor guard ${guard_id}: `, error);
        throw new Error(error);
    }
};