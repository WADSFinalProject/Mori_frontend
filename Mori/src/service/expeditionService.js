
import { api } from '../contexts/api';



export const createExpedition = async (
  AirwayBill,
  estimatedArrival,
  totalPackages,
  TotalWeight,
  expeditionDate,
  expeditionServiceDetails,
  batches
) => {
  try {
    const expeditionDetails = {
      AirwayBill: AirwayBill,
      EstimatedArrival: estimatedArrival,
      TotalWeight: TotalWeight,
      TotalPackages: totalPackages,
      ExpeditionDate: expeditionDate,
      ExpeditionServiceDetails: expeditionServiceDetails,
    };

    const response = await api.post(
      `/secured/expeditions`,
      expeditionDetails,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const expeditionId = response.data.expeditionId;

    const contentDetails = {
      ExpeditionID: expeditionId,
      BatchIDs: batches,
    };

    return api.post(`/secured/expedition_contents/`, contentDetails, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating expedition: ", error);
    throw new Error(error);
  }
};

export const readExpeditions = async (skip = 0, limit = 100) => {
  try {
    return await api.get(`/secured/all_expeditions`, {
      params: {
        skip,
        limit,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error reading expeditions: ", error);
    throw new Error(error);
  }
};

export const readExpeditions_byAWB = async (awb) => {
  try {
    return await api.get(`/secured/expedition/airwaybill/${awb}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error reading expeditions: ", error);
    throw new Error(error);
  }
};






export const getExpeditionDetails = async (expedition_id) => {
  try {
    return await api.get(`/secured/expeditions/${expedition_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(
      `Error getting details of expedition ${expedition_id}: `,
      error
    );
    throw new Error(error);
  }
};

export const updateExpeditionStatus = async (awb, new_status) => {
  try {
    const expeditionDetails = {
      awb,
      status: new_status,
    };

    return await api.put(
      `/secured/expedition/${awb}/status`,
      expeditionDetails,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(`Error updating expedition status: `, error);
    throw new Error(error);
  }
};

export const deleteExpedition = async (expedition_id) => {
  try {
    return await api.delete(`/secured/expeditions/${expedition_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(`Error deleting expedition ${expedition_id}: `, error);
    throw new Error(error);
  }
};

export const getStatus_byAwb = async (awb) => {
  try {
    return await api.get(
      `/secured/checkpointstatus/airwaybill/${awb}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(`Error getting checkpoint: `, error);
    throw new Error(error);
  }
};

export const createCheckpointStatus = async (
  airwaybill,
  status,
  statusdate
) => {
  try {
    const checkpointStatusData = {
      status,
      statusdate,
    };

    const response = await api.post(
      `/secured/checkpoint_statuses?airwaybill=${airwaybill}`,
      checkpointStatusData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating checkpoint status: ", error);
    throw new Error(error);
  }
};
