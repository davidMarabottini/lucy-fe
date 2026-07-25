import { useAppQuery } from "../useAppApi/useAppQuery";
import apiClient from "@/api/apiClient";

export interface DashboardEmployeeStatus {
  id: number;
  name: string;
  surname: string;
  hasClockedIn: boolean;
  firstClockIn?: string;
  lastClockOut?: string;
}

export const useDashboardEmployeeStatus = (date: string) =>
  useAppQuery<DashboardEmployeeStatus[]>({
    queryKey: ['dashboard-employees', date],
    queryFn: async () => {
      const { data } = await apiClient.get('/api/dashboard/employees-status', { params: { date } });
      return data;
    },
    staleTime: 1000 * 60 * 2,
  });