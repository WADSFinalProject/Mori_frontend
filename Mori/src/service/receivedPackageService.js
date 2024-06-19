
import { api } from '../contexts/api';



export const createReceivedPackage = async (expeditionID, userID, packageType, receivedDate, warehouseDestination) => {
    try {
        const packageDetails = {
            ExpeditionID: expeditionID,
            UserID: userID,
            PackageType: packageType,
            ReceivedDate: receivedDate,
            WarehouseDestination: warehouseDestination
        };

        return await api.post( "/secured/received_packages", packageDetails);
    } catch (error) {
        console.error("Error creating received package: ", error);
        throw new Error(error);
    }
};

export const readReceivedPackages = async (skip = 0, limit = 100) => {
    try {
        const params = {
            skip: skip,
            limit: limit
        };

        return await api.get( "/secured/received_packages", {
            headers: {
                "Content-Type": "application/json",
            },
            params: params
        });
    } catch (error) {
        console.error("Error reading received packages: ", error);
        throw new Error(error);
    }
};

export const getReceivedPackageDetails = async (package_id) => {
    try {
        return await api.get( `/secured/received_packages/${package_id}`);
    } catch (error) {
        console.error(`Error getting details of received package ${package_id}: `, error);
        throw new Error(error);
    }
};

export const updateReceivedPackage = async (package_id, expeditionID, userID, packageType, receivedDate, warehouseDestination) => {
    try {
        const packageDetails = {
            ExpeditionID: expeditionID,
            UserID: userID,
            PackageType: packageType,
            ReceivedDate: receivedDate,
            WarehouseDestination: warehouseDestination
        };

        return await api.put( `/secured/received_packages/${package_id}`, packageDetails);
    } catch (error) {
        console.error(`Error updating received package ${package_id}: `, error);
        throw new Error(error);
    }
};

export const deleteReceivedPackage = async (package_id) => {
    try {
        return await api.delete( `/secured/received_packages/${package_id}`);
    } catch (error) {
        console.error(`Error deleting received package ${package_id}: `, error);
        throw new Error(error);
    }
};