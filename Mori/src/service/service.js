import axios from "axios";

axios.defaults.withCredentials = true

export const registerUser = async (userDetails) => {
  try {
    const { IDORole, Email, FullName, Role, Phone } = userDetails;

    const newUser = {
      IDORole,
      Email,
      FullName,
      Role,
      Phone,
    };

    return axios.post("http://localhost:8000/users/register", newUser, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error registering user: ", error);
    throw new Error(error);
  }
};

export const validateToken = async (token) => {
  try {
    return axios.get(`http://localhost:8000/users/validate-link`, {
      params: {
        token: token
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error validating token: ", error);
    throw new Error(error);
  }
};

export const setPassword = async (token, newPassword) => {
  try {
    const passwordDetails = {
      token: token,
      new_password: newPassword,
    };

    return axios.post("http://localhost:8000/users/setpassword", passwordDetails, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error setting password: ", error);
    throw new Error(error);
  }
};

export const loginUser = async (email, password) => {
  try {
    const loginDetails = {
      Email: email,
      Password: password,
    };

    return axios.post("http://localhost:8000/users/login", loginDetails, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error logging in: ", error);
    throw new Error(error);
  }
};

export const verifyUser = async (email, code) => {
  try {
    const verificationDetails = {
      Email: email,
      Code: code,
    };

    return axios.post("http://localhost:8000/users/verify", verificationDetails, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error verifying user: ", error);
    throw new Error(error);
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    return axios.post("http://localhost:8000/token/refresh", {}, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  } catch (error) {
    console.log("Error refreshing token: ", error);
    throw new Error(error);
  }
};

export const resendCode = async () => {
  try {
    return axios.post("http://localhost:8000/users/resend_code", {}, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error resending code: ", error);
    throw new Error(error);
  }
};

export const logoutUser = async () => {
  try {
    return axios.post("http://localhost:8000/users/logout", {}, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error logging out: ", error);
    throw new Error(error);
  }
};

export const accessProtectedRoute = async () => {
  try {
    return axios.get("http://localhost:8000/secured/protected-route", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error accessing protected route: ", error);
    throw new Error(error);
  }
};

export const createBatch = async (description, dryingID, flouringID, driedDate, flouredDate) => {
  try {
    const batchDetails = {
      Description: description,
      DryingID: dryingID,
      FlouringID: flouringID,
      DriedDate: driedDate,
      FlouredDate: flouredDate,
    };

    return axios.post("http://localhost:8000/secured/batches", batchDetails, {
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
    return axios.get("http://localhost:8000/secured/batches", {
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
    return axios.get(`http://localhost:8000/secured/batches/${batchId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error reading batch: ", error);
    throw new Error(error);
  }
};

export const updateBatch = async (batchId, description, flouringID, dryingID) => {
  try {
    const batchDetails = {
      Description: description,
      FlouringID: flouringID,
      DryingID: dryingID,
    };

    return axios.put(`http://localhost:8000/secured/batches/${batchId}`, batchDetails, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error updating batch: ", error);
    throw new Error(error);
  }
};

export const deleteBatch = async (batchId) => {
  try {
    return axios.delete(`http://localhost:8000/secured/batches/${batchId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error deleting batch: ", error);
    throw new Error(error);
  }
};

export const getDriedDate = async (dryingId) => {
  try {
    return axios.get(`http://localhost:8000/secured/drying-activities/${dryingId}/date`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error getting dried date: ", error);
    throw new Error(error);
  }
};

export const getFlouredDate = async (flouringId) => {
  try {
    return axios.get(`http://localhost:8000/secured/flouring-activities/${flouringId}/date`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error getting floured date: ", error);
    throw new Error(error);
  }
};

export const startMachine = async (machineId) => {
  try {
    return axios.post(`http://localhost:8000/secured/drying_machines/${machineId}/start`, {}, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error starting machine: ", error);
    throw new Error(error);
  }
};

export const stopMachine = async (machineId) => {
  try {
    return axios.post(`http://localhost:8000/secured/drying_machines/${machineId}/stop`, {}, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error stopping machine: ", error);
    throw new Error(error);
  }
};

export const readMachineStatus = async (machineId) => {
  try {
    return axios.get(`http://localhost:8000/secured/drying_machines/${machineId}/status`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error reading machine status: ", error);
    throw new Error(error);
  }
};

export const readFlouringMachineStatus = async (machineId) => {
  try {
    return axios.get(`http://localhost:8000/secured/flouring_machines/${machineId}/status`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error reading flouring machine status: ", error);
    throw new Error(error);
  }
};

export const startFlouringMachine = async (machineId) => {
  try {
    return axios.post(`http://localhost:8000/secured/flouring_machines/${machineId}/start`, {}, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error starting flouring machine: ", error);
    throw new Error(error);
  }
};

export const stopFlouringMachine = async (machineId) => {
  try {
    return axios.post(`http://localhost:8000/secured/flouring_machines/${machineId}/stop`, {}, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error stopping flouring machine: ", error);
    throw new Error(error);
  }
};

export const createWetLeavesCollection = async (centralId, date, weight, expired, expirationTime) => {
  try {
    const collectionDetails = {
      CentralID: centralId,
      Date: date,
      Weight: weight,
      Expired: expired,
      ExpirationTime: expirationTime,
    };

    return axios.post("http://localhost:8000/secured/wet-leaves-collections", collectionDetails, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error creating wet leaves collection: ", error);
    throw new Error(error);
  }
};

export const readWetLeavesCollections = async (skip = 0, limit = 100) => {
  try {
    return axios.get("http://localhost:8000/secured/wet-leaves-collections", {
      params: {
        skip: skip,
        limit: limit,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error reading wet leaves collections: ", error);
    throw new Error(error);
  }
};

export const readWetLeavesCollection = async (wetLeavesBatchId) => {
  try {
    return axios.get(`http://localhost:8000/secured/wet-leaves-collections/${wetLeavesBatchId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error reading wet leaves collection: ", error);
    throw new Error(error);
  }
};

export const updateWetLeavesCollection = async (wetLeavesBatchId, date, weight, expired, expirationTime) => {
  try {
    const collectionDetails = {
      Date: date,
      Weight: weight,
      Expired: expired,
      ExpirationTime: expirationTime,
    };

    return axios.put(`http://localhost:8000/secured/wet-leaves-collections/${wetLeavesBatchId}`, collectionDetails, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error updating wet leaves collection: ", error);
    throw new Error(error);
  }
};

export const deleteWetLeavesCollection = async (wetLeavesBatchId) => {
  try {
    return axios.delete(`http://localhost:8000/secured/wet-leaves-collections/${wetLeavesBatchId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error deleting wet leaves collection: ", error);
    throw new Error(error);
  }
};

