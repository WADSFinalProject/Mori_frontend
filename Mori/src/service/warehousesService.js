import { getApi } from '../contexts/api';
import { host } from "./config";

const api = getApi()

export const getAllWarehouses = async (skip = 0, limit = 100) => {
    try {
        const params = {
            skip: skip,
            limit: limit
        };

        return await api.get(host + "/secured/warehouses", {
        
            params: params
        });
    } catch (error) {
        console.error("Error getting all warehouses: ", error);
        throw new Error(error);
    }
};

export const createWarehouse = async (email, phone, stock, location) => {
    try {
        // const now = new Date();
        // const isoString = now.toISOString();

        const warehouseDetails = {
            email: email,
            phone: phone,
            TotalStock: stock,
            location: location,
            // created_at: isoString
        };

        return await api.post(host + "/secured/warehouses", warehouseDetails);
    } catch (error) {
        console.error("Error creating warehouse: ", error);
        throw new Error(error);
    }
};

export const getWarehouseDetails = async (warehouse_id) => {
    try {
        return await api.get(host + `/secured/warehouses/${warehouse_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(`Error getting details of warehouse ${warehouse_id}: `, error);
        throw new Error(error);
    }
};

export const editWarehouse = async (warehouse_id, email, phone, stock, location) => {
    try {
        const warehouseDetails = {
            email: email,
            phone: phone,
            TotalStock: stock,
            location: location,
        };

        return await api.put(host + `/secured/warehouses/${warehouse_id}`, warehouseDetails, {
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
        return await api.delete(host + `/secured/warehouses/${warehouse_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(`Error deleting warehouse ${warehouse_id}: `, error);
        throw new Error(error);
    }
};
