import apiClient from "./apiClient";

export type LibemaxUser = {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  theoretical_hours?: number | null;
  total_hours?: number | null;
};

export type MissingClockin = {
  id: number;
  name: string;
  expected_time: string;
  phone?: string;
  delay: number;
};

export type RemoteClockin = {
  id: number;
  name: string;
  time: string;
  location: string;
  phone?: string;
  theoretical_hours?: number | null;
  distance: number;
};

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
