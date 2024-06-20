
import { api } from '../contexts/api';



export const createBatch = async (
  centraID,
  driedID,
  weight,
  flouredDate,
  shipped
) => {
  try {
    const batchDetails = {
      CentraID: centraID,
      DriedID: driedID,
      Weight: weight,
      FlouredDate: flouredDate,
      Shipped: shipped,
    };

    const response = await api.post( "/secured/batches", batchDetails, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error creating batch: ", error);
    throw new Error(error);
  }
};


export const readBatches = async (skip = 0, limit = 100) => {
  try {
    return api.get( "/secured/batches", {
      params: {
        skip: skip,
        limit: limit,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error reading batches: ", error);
    throw new Error(error);
  }
};

export const readBatch = async (batchId) => {
  try {
    return api.get( `/secured/batches/${batchId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error reading batch: ", error);
    throw new Error(error);
  }
};

// export const updateBatch = async (batchId, description, flouringID, dryingID) => {
//     try {
//         const batchDetails = {
//             Description: description,
//             FlouringID: flouringID,
//             DryingID: dryingID,
//         };

//         return api.put(z `/secured/batches/${batchId}`, batchDetails, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//     } catch (error) {
//         console.log("Error updating batch: ", error);
//         throw new Error(error);
//     }
// };

export const BatchShipped = async (batches) => {
  try {
    return api.put(`/secured/batchesShipped/`, batches, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error updating batch status: ", error);
    throw new Error(error);
  }
};

export const deleteBatch = async (batchId) => {
  try {
    return api.delete(`/secured/batches/${batchId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error deleting batch: ", error);
    throw new Error(error);
  }
};
