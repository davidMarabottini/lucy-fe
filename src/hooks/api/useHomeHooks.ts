
import { useAppQuery } from "../useAppApi/useAppQuery";
import { ERROR_KINDS } from "../useAppApi/error";
import { getCounts } from "@/api/homeService";
import { ROUTE_SECTIONS } from "@/constants/routes";
import { exportClientExcel } from "@/api/clientService";
import { exportEmployeesExcel } from "@/api/employeesService";
import { exportGroupCompaniesExcel } from "@/api/groupCompanyService";
import { exportWorkActivitiesExcel } from "@/api/workActivityService";
import { exportContractExcel } from "@/api/contractService";
import { exportSectorsExcel } from "@/api/sectorService";
import { exportUsersExcel } from "@/api/userService";
import { exportWorkScheduleTypesExcel } from "@/api/workScheduleTypeService";
import { useAppMutation } from "../useAppApi/useAppMutation";

const libDomain = 'home';

const excelExport: Record<keyof typeof ROUTE_SECTIONS, (filters?: Record<string, (filters?: Record<string, unknown>) => void>) => void> = {
  [ROUTE_SECTIONS.CLIENTS]: exportClientExcel,
  [ROUTE_SECTIONS.EMPLOYEES]: exportEmployeesExcel,
  [ROUTE_SECTIONS.GROUP_COMPANIES]: exportGroupCompaniesExcel,
  [ROUTE_SECTIONS.WORK_ACTIVITIES]: exportWorkActivitiesExcel,
  [ROUTE_SECTIONS.CONTRACTS]: exportContractExcel,
  [ROUTE_SECTIONS.SECTORS]: exportSectorsExcel,
  [ROUTE_SECTIONS.USERS]: exportUsersExcel,
  [ROUTE_SECTIONS.WORK_SCHEDULE_TYPES]: exportWorkScheduleTypesExcel,

  // [ROUTE_SECTIONS.AUTH]: '/export/auth',
  // [ROUTE_SECTIONS.SETTINGS]: '/export/settings',
  // [ROUTE_SECTIONS.CLIENTS]: '/export/client',
};

export const useCounts = () =>
  useAppQuery({
    queryKey: ['home-counts'],
    queryFn: () => getCounts(),
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.list.401`,
      [ERROR_KINDS.SERVER]: `${libDomain}.list.500`,
      [ERROR_KINDS.NETWORK]: `${libDomain}.list.network`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.list.defaultError`
    },
    staleTime: 1000 * 60 * 60,
  });

export const useExportGeneralExcel = () =>
  useAppMutation({
    mutationFn: (type: keyof typeof ROUTE_SECTIONS, filters: Record<string, string>) => {
      if (excelExport[type]) {
        return excelExport[type]?.(filters);
      }
    },
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${libDomain}.export.401`,
      [ERROR_KINDS.SERVER]: `${libDomain}.export.500`,
      [ERROR_KINDS.NETWORK]: `${libDomain}.export.network`,
      [ERROR_KINDS.UNKNOWN]: `${libDomain}.export.defaultError`
    },
    staleTime: 1000 * 60 * 60,
  });
