import axios from "axios";
import { host } from "./config";

axios.defaults.withCredentials = true;

export const getConversionRates = async () => {
  try {
    const response = await axios.get(`${host}/secured/conversion_rates`);
    return response.data;
  } catch (error) {
    console.error("Error fetching conversion rates:", error);
    throw error;
  }
};
