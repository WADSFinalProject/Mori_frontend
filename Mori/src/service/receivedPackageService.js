import axios from "axios";
import { host } from "./config";

axios.defaults.withCredentials = true

export const createReceivedPackage = async (expeditionID, userID, packageType, receivedDate, warehouseDestination) => {
    try {
        const packageDetails = {
            ExpeditionID: expeditionID,
            UserID: userID,
            PackageType: packageType,
            ReceivedDate: receivedDate,
            WarehouseDestination: warehouseDestination
        };

        return await axios.post(host + "/secured/received_packages", packageDetails);
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

        return await axios.get(host + "/secured/received_packages", {
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
        return await axios.get(host + `/secured/received_packages/${package_id}`);
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

        return await axios.put(host + `/secured/received_packages/${package_id}`, packageDetails);
    } catch (error) {
        console.error(`Error updating received package ${package_id}: `, error);
        throw new Error(error);
    }
};

export const deleteReceivedPackage = async (package_id) => {
    try {
        return await axios.delete(host + `/secured/received_packages/${package_id}`);
    } catch (error) {
        console.error(`Error deleting received package ${package_id}: `, error);
        throw new Error(error);
    }
};