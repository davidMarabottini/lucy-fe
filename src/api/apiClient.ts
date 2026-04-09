import { BACKEND_PATH } from "@constants/api";
import axios from "axios";

const api = axios.create({
  baseURL: BACKEND_PATH,
  withCredentials: true,
});

export const mockApi = axios.create({
  baseURL: "http://localhost:3001",
});

export default api;