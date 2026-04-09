import { useQuery } from "@tanstack/react-query";
import { getWeekDays, getWeekDayById } from "@/api/weekDaysService";

export const useWeekDays = () => {
  return useQuery({
    queryKey: ["week-days"],
    queryFn: getWeekDays,
    staleTime: 1000 * 60 * 60, 
    // cacheTime: 1000 * 60 * 60 * 24,
  });
};

export const useWeekDay = (id: number | undefined) => {
  return useQuery({
    queryKey: ["week-days", id],
    queryFn: () => getWeekDayById(id!),
    enabled: !!id, // Parte solo se l'id è definito
  });
};