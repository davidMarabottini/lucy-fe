import type { MarkRequired, ValueOf } from "@/types/utilities.types";
import {
  LogIn,
  User,
  HomeIcon, type LucideIcon, LogOutIcon, UserCheck2Icon, 
  Building,
  Plus,
  Briefcase,
  Layers} from "lucide-react";
import React, { lazy, type LazyExoticComponent } from "react";
import { AUTH_DOMAINS, AVAILABLE_MENUS } from "./configuration";
import type { RouteObject } from "react-router-dom";

const Login = lazy(() => import("@/pages/Login/Login"));
const Home = lazy(() => import("@/pages/Home/Home"));
const LibemaxEmployees = lazy(() => import("@/pages/Employees/List/List"));
const EmployeeDetail = lazy(() => import("@/pages/Employees/Details/Details"));
const InsertEmployee = lazy(() => import("@/pages/Employees/Insert/Insert"));
const LibemaxClients = lazy(() => import("@/pages/Clients/List/List"));
const ClientDetail = lazy(() => import("@/pages/Clients/Details/Details"));
const ClientInsert = lazy(() => import("@/pages/Clients/Insert/Insert"));
const Registration = lazy(() => import("@/pages/Users/Insert/Insert"));
const UserList = lazy(() => import("@/pages/Users/List/List"));
const WorkActivities = lazy(() => import("@/pages/WorkActivities/List/List"));
const WorkActivitiesInsert = lazy(() => import("@/pages/WorkActivities/Insert/Insert"));
const SectorList = lazy(() => import("@/pages/Sectors/List/List"));
const SectorInsert = lazy(() => import("@/pages/Sectors/Insert/Insert"));
const GroupCompanyList = lazy(() => import("@/pages/GroupCompany/List/List"));
const GroupCompanyDetails = lazy(() => import("@/pages/GroupCompany/Details/Details"));
const GroupCompanyInsert = lazy(() => import("@/pages/GroupCompany/Insert/Insert"));
const ContractInsert = lazy(() => import("@/pages/Contracts/Insert/Insert"));
const ContractList = lazy(() => import("@/pages/Contracts/List/List"));
const ContractDetail = lazy(() => import("@/pages/Contracts/Details/Details"));
const WorkScheduleTypeInsert = lazy(() => import("@/pages/WorkScheduleType/Insert/Insert"));
const WorkScheduleTypeList = lazy(() => import("@/pages/WorkScheduleType/List/List"));

export type RouteHandle = {
  key: string;
  label: string;
  Icon: LucideIcon;
  domain: ValueOf<typeof AUTH_DOMAINS>[];
  menu: ValueOf<typeof AVAILABLE_MENUS>[];
} & ({
  isOnlyMenu?: false
} | {
  isOnlyMenu: true
  menuAction: (fn: () => void) => void
});

export type AppRouteObject = MarkRequired<RouteObject, 'path'> & {
  Element?: LazyExoticComponent<() => React.JSX.Element>;
  handle: RouteHandle;
}

export type MenuItem = {
  path: string;
  handle: RouteHandle;
};

type StructuredMenu = Partial<
  Record<
    ValueOf<typeof AVAILABLE_MENUS>,
    Partial<Record<ValueOf<typeof AUTH_DOMAINS>, MenuItem[]>>
  >
>;

const ROUTE_CONFIGS: readonly AppRouteObject[] = Object.freeze([
  {path: '/', Element: Home, handle: {key: 'HOME', label: 'labels.home', Icon: HomeIcon, domain: [AUTH_DOMAINS.PUBLIC, AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.MAIN]}},
  {path: '/login', Element: Login, handle: {key: 'LOGIN', label: 'labels.login', Icon: LogIn, domain: [AUTH_DOMAINS.PUBLIC], menu: [AVAILABLE_MENUS.MAIN]}},
  {path: '/libemax-clients', Element: LibemaxClients, handle: {key: 'LIBEMAX_CLIENTS', label: 'labels.libemaxClients', Icon: Building, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.MAIN] }},
  {path: '/clients/:clientId', Element: ClientDetail, handle: { key: 'CLIENT_DETAIL', domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/clients/insert',  Element: ClientInsert,  handle: {key: 'INSERT_CLIENT', label: 'labels.insertClient', Icon: Plus, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/libemax-employees', Element: LibemaxEmployees, handle: {key: 'LIBEMAX_EMPLOYEES', label: 'labels.libemaxEmployees', Icon: Briefcase, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.MAIN] }},
  {path: '/employees/:employeeId', Element: EmployeeDetail, handle: {key: 'EMPLOYEE_DETAIL', domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/employees/insert', Element: InsertEmployee, handle: {key: 'INSERT_EMPLOYEE', label: 'labels.insertEmployee', Icon: Plus, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/registration',  Element: Registration,  handle: {key: 'REGISTRATION', label: 'labels.registration', Icon: UserCheck2Icon, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/users', Element: UserList, handle: {key: 'USER_LIST', label: 'labels.userList', Icon: User, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.USER]}},
  {path: '/work-activities', Element: WorkActivities, handle: {key: 'WORK_ACTIVITIES', label: 'labels.workActivities', Icon: Briefcase, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.MAIN]}},
  {path: '/work-activities/insert', Element: WorkActivitiesInsert, handle: {key: 'WORK_ACTIVITIES_INSERT', label: 'labels.workActivities/insert', Icon: Briefcase, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/sectors', Element: SectorList, handle: {key: 'SECTORS', label: 'labels.sectors', Icon: Layers, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.MAIN]}},
  {path: '/sectors/insert', Element: SectorInsert, handle: {key: 'SECTOR_INSERT', label: 'labels.sectorInsert', Icon: Plus, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '', handle: {key: 'LOGOUT', label: 'labels.logout', Icon: LogOutIcon, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.USER], isOnlyMenu: true, menuAction: (logout: () => void) => logout() } },
  {path: '/group-companies', Element: GroupCompanyList, handle: {key: 'GROUP_COMPANIES', label: 'labels.groupCompanies', Icon: Building, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.MAIN]}},
  {path: '/group-companies/:companyId', Element: GroupCompanyDetails, handle: {key: 'GROUP_COMPANY_DETAIL', domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/group-companies/insert', Element: GroupCompanyInsert, handle: {key: 'GROUP_COMPANY_INSERT', label: 'labels.groupCompanyInsert', Icon: Plus, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/work-schedule-types', Element: WorkScheduleTypeList, handle: {key: 'WORK_SCHEDULE_TYPE_LIST', label: 'labels.workScheduleTypes', Icon: Layers, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.MAIN]}},
  {path: '/work-schedule-types/insert', Element: WorkScheduleTypeInsert, handle: {key: 'WORK_SCHEDULE_TYPE_INSERT', label: 'labels.workScheduleTypeInsert', Icon: Plus, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/contracts', Element: ContractList, handle: {key: 'CONTRACT_LIST', label: 'labels.contractList', Icon: Briefcase, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.MAIN]}},
  {path: '/contracts/insert', Element: ContractInsert, handle: {key: 'CONTRACT_INSERT', label: 'labels.contractInsert', Icon: Plus, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/contracts/:contractId', Element: ContractDetail, handle: {key: 'CONTRACT_DETAIL', domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
]);

export type TStructRoute = ValueOf<typeof AUTH_DOMAINS> | `${ValueOf<typeof AUTH_DOMAINS>}__${ValueOf<typeof AUTH_DOMAINS>}`

type StructuredRoutes = Record<TStructRoute, AppRouteObject[]>;


export const structuredRoutes = ROUTE_CONFIGS.reduce((acc, route) => {
  const key = route.handle.domain.toSorted().join('__') as TStructRoute;

  if (!acc[key]) {
    acc[key] = [];
  }

  acc[key].push(route);

  return acc;
}, {} as StructuredRoutes);

const dKeys = Object.keys(AUTH_DOMAINS)
const menuKeys = Object.keys(AVAILABLE_MENUS)

export const structuredMenu = (() => {
  const m: StructuredMenu = {};

  for (const menuKey of menuKeys) {
    const menu = AVAILABLE_MENUS[menuKey as keyof typeof AVAILABLE_MENUS];
    m[menu] = {};

    for (const domainKey of dKeys) {
      const domain = AUTH_DOMAINS[domainKey as keyof typeof AUTH_DOMAINS];

      m[menu][domain] = ROUTE_CONFIGS
        .filter(({ handle }) =>
          handle.menu.includes(menu) &&
          handle.domain.includes(domain)
        )
        .map(({ path, handle }) => ({ path, handle }));
    }
  }

  return m
})()

export const ROUTES = ROUTE_CONFIGS.reduce((acc, { handle, path }: AppRouteObject) => {
  if(!handle.isOnlyMenu) acc[handle.key] = path;
  return acc;
}, {} as Record<RouteHandle['key'], string>);
