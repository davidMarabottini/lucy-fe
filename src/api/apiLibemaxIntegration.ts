import apiClient from "./apiClient";
import type { LibemaxUser, MissingClockin, RemoteClockin } from "./types";

export const getLibemaxUsers = async (): Promise<LibemaxUser[]> => {
  const { data } = await apiClient.get("/api/libemax/users");
  return data;
};

export const getMissingClockin = async (): Promise<MissingClockin[]> => {
  const { data } = await apiClient.get("/api/libemax/missing_clockin");
  return data;
};

export const getRemoteClockin = async (): Promise<RemoteClockin[]> => {
  const { data } = await apiClient.get("/api/libemax/remote_clockin");
  return data;
};
