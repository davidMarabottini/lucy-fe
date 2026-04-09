import type { AvailableDomainsType } from "@/types/contentsFormDatas.types";
import apiClient from "./apiClient";

export type DomainType = {
  id: number;
  name: AvailableDomainsType;
  description: string | null;
}
export const getDomain = async (): Promise<DomainType[]> => {
  const { data } = await apiClient.get('/api/domains');
  return data;
};
