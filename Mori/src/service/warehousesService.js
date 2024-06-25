
import { api } from '../contexts/api';



export const getAllWarehouses = async (skip = 0, limit = 100) => {
    try {
        const params = {
            skip: skip,
            limit: limit
        };

        return await api.get( "/secured/warehouses", {
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

export const createWarehouse = async (email, phone, stock, location, Capacity, created_at) => {
    try {
        // const now = new Date();
        // const isoString = now.toISOString();

        const warehouseDetails = {
            email: email,
            phone: phone,
            TotalStock: stock,
            location: location,
            Capacity: Capacity,
            created_at: created_at
        };

        return await api.post( "/secured/warehouses", warehouseDetails, );
    } catch (error) {
        console.error("Error creating warehouse: ", error);
        throw new Error(error);
    }
};

export const getWarehouseDetails = async (warehouse_id) => {
    try {
        return await api.get( `/secured/warehouses/${warehouse_id}`, );
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

        return await api.put( `/secured/warehouses/${warehouse_id}`, warehouseDetails, );
    } catch (error) {
        console.error(`Error updating warehouse ${warehouse_id}: `, error);
        throw new Error(error);
    }
};

export const deleteWarehouse = async (warehouse_id) => {
    try {
        return await api.delete( `/secured/warehouses/${warehouse_id}` );
    } catch (error) {
        console.error(`Error deleting warehouse ${warehouse_id}: `, error);
        throw new Error(error);
    }
};
