import apiClient from "./apiClient";
// import { exportFile } from "../utils/externalApi";
import mockWorkedHours from "../../public/mocks/ore-lavorate.json";

export const getCounts = async () => {
  const response = await apiClient.get("/api/home/count");
  return response.data;
};

export const getWorkedHours = async () => {
  // const response = await apiClient.get("/mocks/ore-lavorate.json");
  return mockWorkedHours;
};