import { host } from "./config";

export const createProductReceipt = async (productID, receiptID, rescaledWeight) => {
    try {
        const receiptDetails = {
            ProductID: productID,
            ReceiptID: receiptID,
            RescaledWeight: rescaledWeight
        };

        return await axios.post(host + "/secured/product_receipts", receiptDetails, );
    } catch (error) {
        console.error("Error creating product receipt: ", error);
        throw new Error(error);
    }
};

export const readProductReceipts = async (skip = 0, limit = 100) => {
    try {
        const params = {
            skip: skip,
            limit: limit
        };

        return await axios.get(host + "/secured/product_receipts", {
            headers: {
                "Content-Type": "application/json",
            },
            params: params
        });
    } catch (error) {
        console.error("Error reading product receipts: ", error);
        throw new Error(error);
    }
};

export const getProductReceiptDetails = async (product_receipt_id) => {
    try {
        return await axios.get(host + `/secured/product_receipts/${product_receipt_id}`, );
    } catch (error) {
        console.error(`Error getting details of product receipt ${product_receipt_id}: `, error);
        throw new Error(error);
    }
};

export const updateProductReceipt = async (product_receipt_id, productID, receiptID, rescaledWeight) => {
    try {
        const receiptDetails = {
            ProductID: productID,
            ReceiptID: receiptID,
            RescaledWeight: rescaledWeight
        };

        return await axios.put(host + `/secured/product_receipts/${product_receipt_id}`, receiptDetails, );
    } catch (error) {
        console.error(`Error updating product receipt ${product_receipt_id}: `, error);
        throw new Error(error);
    }
};

export const deleteProductReceipt = async (product_receipt_id) => {
    try {
        return await axios.delete(host + `/secured/product_receipts/${product_receipt_id}`, );
    } catch (error) {
        console.error(`Error deleting product receipt ${product_receipt_id}: `, error);
        throw new Error(error);
    }
};