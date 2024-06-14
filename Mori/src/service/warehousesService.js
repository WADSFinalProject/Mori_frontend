import axios from "axios";

axios.defaults.withCredentials = true

export const getAllWarehouses = async (skip = 0, limit = 100) => {
    try {
        const params = {
            skip: skip,
            limit: limit
        };

        return await axios.get("http://localhost:8000/secured/warehouses", {
            headers: {
                "Content-Type": "application/json",
            },
            params: params
        });
    } catch (error) {
        console.error("Error getting all warehouses: ", error);
        throw new Error(error);
    }
};

export const createWarehouse = async (PIC_name, email, phone) => {
    try {
        const warehouseDetails = {
            PIC_name: PIC_name,
            email: email,
            phone: phone,
        };

        return await axios.post("http://localhost:8000/secured/warehouses", warehouseDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error creating warehouse: ", error);
        throw new Error(error);
    }
};

export const getWarehouseDetails = async (warehouse_id) => {
    try {
        return await axios.get(`http://localhost:8000/secured/warehouses/${warehouse_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(`Error getting details of warehouse ${warehouse_id}: `, error);
        throw new Error(error);
    }
};

export const updateWarehouse = async (warehouse_id, PIC_name, email, phone) => {
    try {
        const warehouseDetails = {
            PIC_name: PIC_name,
            email: email,
            phone: phone,
        };

        return await axios.put(`http://localhost:8000/secured/warehouses/${warehouse_id}`, warehouseDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(`Error updating warehouse ${warehouse_id}: `, error);
        throw new Error(error);
    }
};

export const deleteWarehouse = async (warehouse_id) => {
    try {
        return await axios.delete(`http://localhost:8000/secured/warehouses/${warehouse_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(`Error deleting warehouse ${warehouse_id}: `, error);
        throw new Error(error);
    }
};
