import apiClient from "./apiClient";
// import { exportFile } from "../utils/externalApi";

export const getCounts = async () => {
  const response = await apiClient.get("/api/home/count");
  return response.data;
};