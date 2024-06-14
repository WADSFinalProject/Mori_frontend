export const createProductReceipt = async (productID, receiptID, rescaledWeight) => {
    try {
        const receiptDetails = {
            ProductID: productID,
            ReceiptID: receiptID,
            RescaledWeight: rescaledWeight
        };

        return await axios.post("https://mori-backend.vercel.app/secured/product_receipts", receiptDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
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

        return await axios.get("https://mori-backend.vercel.app/secured/product_receipts", {
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
        return await axios.get(`https://mori-backend.vercel.app/secured/product_receipts/${product_receipt_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
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

        return await axios.put(`https://mori-backend.vercel.app/secured/product_receipts/${product_receipt_id}`, receiptDetails, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(`Error updating product receipt ${product_receipt_id}: `, error);
        throw new Error(error);
    }
};

export const deleteProductReceipt = async (product_receipt_id) => {
    try {
        return await axios.delete(`https://mori-backend.vercel.app/secured/product_receipts/${product_receipt_id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(`Error deleting product receipt ${product_receipt_id}: `, error);
        throw new Error(error);
    }
};