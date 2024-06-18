import axios from "axios";
import { host } from "./config";

axios.defaults.withCredentials = true;

export const createBatch = async (
  description,
  dryingID,
  flouringID,
  driedDate,
  flouredDate
) => {
  try {
    const batchDetails = {
      Description: description,
      DryingID: dryingID,
      FlouringID: flouringID,
      DriedDate: driedDate,
      FlouredDate: flouredDate,
    };

    return axios.post(host + "/secured/batches", batchDetails, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error creating batch: ", error);
    throw new Error(error);
  }
};

export const readBatches = async (skip = 0, limit = 100) => {
  try {
    return axios.get(host + "/secured/batches", {
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
    return axios.get(host + `/secured/batches/${batchId}`, {
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

//         return axios.put(host + `/secured/batches/${batchId}`, batchDetails, {
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
  // ini langsung set the shipped status jadi True HEHEHEHEH
  try {
    return axios.put(host + `secured/batchesShipped/`, batches, {
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
    return axios.delete(host + `/secured/batches/${batchId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error deleting batch: ", error);
    throw new Error(error);
  }
};
