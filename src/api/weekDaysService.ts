import apiClient from "../api/apiClient";

export interface WeekDay {
  id: number;
  name: string;
  order: number; // Utile se il backend lo fornisce per l'ordinamento
}

export const getWeekDays = async (): Promise<WeekDay[]> => {
  const { data } = await apiClient.get<WeekDay[]>("/api/week-days");
  return data;
};

export const getWeekDayById = async (id: number): Promise<WeekDay> => {
  const { data } = await apiClient.get<WeekDay>(`/api/week-days/${id}`);
  return data;
};