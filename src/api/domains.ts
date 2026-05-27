import apiClient from "./apiClient";
import type { DomainType } from "./types";

export const getDomain = async (): Promise<DomainType[]> => {
  const { data } = await apiClient.get('/api/domains');
  return data;
};
