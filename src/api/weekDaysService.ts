import apiClient from "../api/apiClient";
import type { WeekDay } from "./types";

export const getWeekDays = async (): Promise<WeekDay[]> => {
  const { data } = await apiClient.get<WeekDay[]>("/api/week-days");
  return data;
};

export const getWeekDayById = async (id: number): Promise<WeekDay> => {
  const { data } = await apiClient.get<WeekDay>(`/api/week-days/${id}`);
  return data;
};