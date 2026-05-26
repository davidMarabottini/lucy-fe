import apiClient from "./apiClient";

// /api/libemax/timbrature?from=2024-05-12&to=2024-05-12
export const getLibemaxTimbrature = async (userId: number, date: string) => {
  const {data} = await apiClient.get(`/api/libemax/timbrature?user_id=${userId}&from=${date}&to=${date}`);
  return data;
};