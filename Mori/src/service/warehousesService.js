
import { host } from "./config";
import { api } from '../contexts/api';



export const getAllWarehouses = async (skip = 0, limit = 100) => {
    try {
        const params = {
            skip: skip,
            limit: limit
        };

        return await api.get(host + "/secured/warehouses", {
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

        return await api.post(host + "/secured/warehouses", warehouseDetails, );
    } catch (error) {
        console.error("Error creating warehouse: ", error);
        throw new Error(error);
    }
};

export const getWarehouseDetails = async (warehouse_id) => {
    try {
        return await api.get(host + `/secured/warehouses/${warehouse_id}`, );
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

        return await api.put(host + `/secured/warehouses/${warehouse_id}`, warehouseDetails, );
    } catch (error) {
        console.error(`Error updating warehouse ${warehouse_id}: `, error);
        throw new Error(error);
    }
};

export const deleteWarehouse = async (warehouse_id) => {
    try {
        return await api.delete(host + `/secured/warehouses/${warehouse_id}` );
    } catch (error) {
        console.error(`Error deleting warehouse ${warehouse_id}: `, error);
        throw new Error(error);
    }
};
