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
      }).catch((error) => {
        console.error("There was an error registering the user: ", error);
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
      }).catch((error) => {
        console.error("There was an error validating the token: ", error);
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
      }).catch((error) => {
        console.error("There was an error setting the password: ", error);
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
      }).catch((error) => {
        console.error("There was an error logging in: ", error);
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
      }).catch((error) => {
        console.error("There was an error verifying the user: ", error);
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
      }).catch((error) => {
        console.error("There was an error refreshing the token: ", error);
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
      }).catch((error) => {
        console.error("There was an error resending the code: ", error);
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
      }).catch((error) => {
        console.error("There was an error logging out: ", error);
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
      }).catch((error) => {
        console.error("There was an error accessing the protected route: ", error);
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
      }).catch((error) => {
        console.error("There was an error creating the batch: ", error);
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
      }).catch((error) => {
        console.error("There was an error reading batches: ", error);
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
      }).catch((error) => {
        console.error("There was an error reading the batch: ", error);
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
      }).catch((error) => {
        console.error("There was an error updating the batch: ", error);
      });
    } catch (error) {
      console.log("Error updating batch: ", error);
      throw new Error(error);
    }
  };

