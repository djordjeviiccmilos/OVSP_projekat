import axios from "axios";

const DELIVERIES_API = "http://127.0.0.1:8000/deliveries";
const ANALYTICS_API = "http://127.0.0.1:8000/analytics";
const REGRESSION_API = "http://127.0.0.1:8000/regression";
const KMEANS_API = "http://127.0.0.1:8000/kmeans";
const PREDICT_API = "http://127.0.0.1:8000/predict"


export const getAllDeliveries = async () => {
  try {
    const response = await axios.get(`${DELIVERIES_API}/all`);
    return response.data;
  } catch (error) {
    console.error("Greska:", error);
    throw error;
  }
};

export const getDeliveryStats = async () => {
  try {
    const response = await axios.get(`${DELIVERIES_API}/stats`);
    return response.data;
  } catch (error) {
    console.error("Greska:", error);
    throw error;
  }
};


export async function getGlobalStats() {
  try {
    const response = await axios.get(`${ANALYTICS_API}/global-stats`);
    return response.data;
  } catch (error) {
    console.error("Greska:", error);
    throw error;
  }
};

export const getTopDeliveryPersons = async () => {
  try {
    const response = await axios.get(`${ANALYTICS_API}/top-delivery-persons`);
    return response.data;
  } catch (error) {
    console.error("Greska:", error);
    throw error;
  }
};

export const getMostPopularOrders = async () => {
  try {
    const response = await axios.get(`${ANALYTICS_API}/most-popular-orders`);
    return response.data;
  } catch (error) {
    console.error("Greska:", error);
    throw error;
  }
};

export const getAverageTimePerVehicle = async () => {
  try {
    const response = await axios.get(`${ANALYTICS_API}/average-time-per-vehicle`);
    return response.data;
  } catch (error) {
    console.error("Greska:", error);
    throw error;
  }
};


export const getDeliveriesWithPrediction = async () => {
  try {
    const response = await axios.get(`${REGRESSION_API}/deliveries-with-prediction`);
    return response.data;
  } catch (error) {
    console.error("Greska:", error);
    throw error;
  }
};


export const getRestaurantClusters = async () => {
  try {
    const response = await axios.get(`${KMEANS_API}/restaurant-clusters`);
    return response.data;
  } catch (error) {
    console.error("Greska: ", error);
    throw error;
  }
};


export const getPrediction = async (lat, lon) => {
  try {
    const response = await axios.get(`${PREDICT_API}/predict`, {
      params: { lat, lon }
    });

    let data = response.data;
    if (typeof data === "string") {
      data = JSON.parse(data);
    }

    return data;
  } catch (error) {
    console.error("Greska: ", error);
    throw error;
  }
};
