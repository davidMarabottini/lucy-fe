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
// deve essere importato asincronicamente
// import UsersDetailPage from "@/pages/Users/Details/Details";

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
const SetDetails = lazy(() => import("@/pages/Contracts/SetDetails/SetDetails"));
const UsersDetailPage = lazy(() => import("@/pages/Users/Details/Details"));
const WorkActivitiesDetails = lazy(() => import("@/pages/WorkActivities/Details/Details"));
const SectorDetailPage = lazy(() => import("@/pages/Sectors/Details/Details"));
const WorkScheduleTypeDetails = lazy(() => import("@/pages/WorkScheduleType/Details/Details"));

export type RouteHandle = {
  key: string;
  label?: string;
  Icon?: LucideIcon;
  domain: ValueOf<typeof AUTH_DOMAINS>[];
  menu: ValueOf<typeof AVAILABLE_MENUS>[];
  section: ValueOf<typeof ROUTE_SECTIONS>;
  action: ValueOf<typeof ACTION_TYPES>;
  // key of the route this one is nested under, used to build multi-level breadcrumbs
  parentKey?: string;
} & ({
  isOnlyMenu?: false
} | {
  isOnlyMenu: true
  menuAction: (fn: () => void) => void
});

export type AppRouteObject = MarkRequired<RouteObject, 'path'> & {
  Element?: LazyExoticComponent<() => React.JSX.Element | null>;
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

export const ROUTE_SECTIONS = {
  HOME: 'HOME',
  AUTH: 'AUTH',
  GROUP_COMPANIES: 'GROUP_COMPANIES',
  WORK_SCHEDULE_TYPES: 'WORK_SCHEDULE_TYPES',
  CONTRACTS: 'CONTRACTS',
  USERS: 'USERS',
  WORK_ACTIVITIES: 'WORK_ACTIVITIES',
  WORK_SCHEDULES: 'WORK_SCHEDULES',
  SECTORS: 'SECTORS',
  SETTINGS: 'SETTINGS',
  CLIENTS: 'CLIENTS',
  EMPLOYEES: 'EMPLOYEES',
};

export const ACTION_TYPES = {
  VIEW: 'VIEW',
  DETAILS: 'DETAILS',
  INSERT: 'INSERT',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
  EDIT_DETAILS: 'EDIT_DETAILS',
  NONE: 'NONE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

export const ROUTE_CONFIGS: readonly AppRouteObject[] = Object.freeze([
  {path: '/', Element: Home, handle: {key: 'HOME', section: ROUTE_SECTIONS.HOME, action: ACTION_TYPES.VIEW, label: 'labels.home', Icon: HomeIcon, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.MAIN]}},
  {path: '/login', Element: Login, handle: {key: 'LOGIN', section: ROUTE_SECTIONS.AUTH, action: ACTION_TYPES.LOGIN, label: 'labels.login', Icon: LogIn, domain: [AUTH_DOMAINS.PUBLIC], menu: [AVAILABLE_MENUS.MAIN]}},
  {path: '/libemax-clients', Element: LibemaxClients, handle: {key: 'LIBEMAX_CLIENTS', section: ROUTE_SECTIONS.CLIENTS, action: ACTION_TYPES.VIEW, label: 'labels.libemaxClients', Icon: Building, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.MAIN] }},
  {path: '/clients/:clientId', Element: ClientDetail, handle: { key: 'CLIENT_DETAIL', section: ROUTE_SECTIONS.CLIENTS, action: ACTION_TYPES.DETAILS, label: 'labels.clientDetail', domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/clients/insert',  Element: ClientInsert,  handle: {key: 'INSERT_CLIENT', section: ROUTE_SECTIONS.CLIENTS, action: ACTION_TYPES.INSERT, label: 'labels.insertClient', Icon: Plus, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/clients/edit/:idClient',  Element: ClientInsert,  handle: {key: 'EDIT_CLIENT', section: ROUTE_SECTIONS.CLIENTS, action: ACTION_TYPES.EDIT, label: 'labels.insertClient', Icon: Plus, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/libemax-employees', Element: LibemaxEmployees, handle: {key: 'LIBEMAX_EMPLOYEES', section: ROUTE_SECTIONS.EMPLOYEES, action: ACTION_TYPES.VIEW, label: 'labels.libemaxEmployees', Icon: Briefcase, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.MAIN] }},
  {path: '/employees/:employeeId', Element: EmployeeDetail, handle: {key: 'EMPLOYEE_DETAIL', section: ROUTE_SECTIONS.EMPLOYEES, action: ACTION_TYPES.DETAILS, label: 'labels.employeeDetail', domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/employees/insert', Element: InsertEmployee, handle: {key: 'INSERT_EMPLOYEE', section: ROUTE_SECTIONS.EMPLOYEES, action: ACTION_TYPES.INSERT, label: 'labels.insertEmployee', Icon: Plus, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/employees/edit/:idEmployee', Element: InsertEmployee, handle: {key: 'EDIT_EMPLOYEE', section: ROUTE_SECTIONS.EMPLOYEES, action: ACTION_TYPES.EDIT, label: 'labels.insertEmployee', Icon: Plus, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/users/add',  Element: Registration,  handle: {key: 'REGISTRATION', section: ROUTE_SECTIONS.USERS, action: ACTION_TYPES.INSERT, label: 'labels.registration',  Icon: UserCheck2Icon, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/users/edit/:userId',  Element: Registration,  handle: {key: 'UPDATE_USER', section: ROUTE_SECTIONS.USERS, action: ACTION_TYPES.EDIT, label: 'labels.registration', Icon: UserCheck2Icon, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/users/:userId', Element: UsersDetailPage, handle: {key: 'USER_DETAILS', section: ROUTE_SECTIONS.USERS, action: ACTION_TYPES.DETAILS, label: 'labels.userDetails', domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/users/list', Element: UserList, handle: {key: 'USER_LIST', section: ROUTE_SECTIONS.USERS, label: 'labels.userList', action: ACTION_TYPES.VIEW, Icon: User, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.USER]}},
  {path: '/work-activities', Element: WorkActivities, handle: {key: 'WORK_ACTIVITIES', section: ROUTE_SECTIONS.WORK_ACTIVITIES, action: ACTION_TYPES.VIEW, label: 'labels.workActivities', Icon: Briefcase, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.MAIN]}},
  {path: '/work-activities/insert', Element: WorkActivitiesInsert, handle: {key: 'WORK_ACTIVITIES_INSERT', section: ROUTE_SECTIONS.WORK_ACTIVITIES, action: ACTION_TYPES.INSERT, label: 'labels.workActivitiesInsert', Icon: Briefcase, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/work-activities/edit/:idActivity', Element: WorkActivitiesInsert, handle: {key: 'WORK_ACTIVITIES_EDIT', section: ROUTE_SECTIONS.WORK_ACTIVITIES, action: ACTION_TYPES.EDIT, label: 'labels.workActivitiesEdit', Icon: Briefcase, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/work-activities/:idActivity', Element: WorkActivitiesDetails, handle: {key: 'WORK_ACTIVITIES_DETAILS', section: ROUTE_SECTIONS.WORK_ACTIVITIES, action: ACTION_TYPES.DETAILS, label: 'labels.workActivitiesDetails', Icon: Briefcase, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/sectors', Element: SectorList, handle: {key: 'SECTORS', section: ROUTE_SECTIONS.SECTORS, label: 'labels.sectors', Icon: Layers, action: ACTION_TYPES.VIEW, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.MAIN]}},
  {path: '/sectors/insert', Element: SectorInsert, handle: {key: 'SECTOR_INSERT', section: ROUTE_SECTIONS.SECTORS, label: 'labels.sectorInsert', action: ACTION_TYPES.INSERT, Icon: Plus, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/sectors/edit/:idSector', Element: SectorInsert, handle: {key:  'SECTOR_EDIT', section: 'SECTORS', label: 'labels.sectorInsert', action: ACTION_TYPES.EDIT, Icon: Plus, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/sectors/:idSector', Element: SectorDetailPage, handle: {key:  'SECTOR_DETAIL', section: 'SECTORS', label: 'labels.sectorDetail', action: ACTION_TYPES.DETAILS, Icon: Layers, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '#', handle: {key: 'SETTINGS', section: ROUTE_SECTIONS.SETTINGS, action: ACTION_TYPES.NONE, label: 'labels.settings',  Icon: Layers, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.USER]}, isOnlyMenu: true, menuAction: (openSettings: () => void) => openSettings() },

  {path: '', handle: {key: 'LOGOUT', action: ACTION_TYPES.LOGOUT, section: ROUTE_SECTIONS.AUTH, label: 'labels.logout', Icon: LogOutIcon, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.USER], isOnlyMenu: true, menuAction: (logout: () => void) => logout() } },
  {path: '/group-companies', Element: GroupCompanyList, handle: {key: 'GROUP_COMPANIES', section: ROUTE_SECTIONS.GROUP_COMPANIES, action: ACTION_TYPES.VIEW, label: 'labels.groupCompanies', Icon: Building, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.MAIN]}},
  {path: '/group-companies/:companyId', Element: GroupCompanyDetails, handle: {key: 'GROUP_COMPANY_DETAIL', section: ROUTE_SECTIONS.GROUP_COMPANIES, action: ACTION_TYPES.DETAILS, label: 'labels.groupCompanyDetail', domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/group-companies/insert', Element: GroupCompanyInsert, handle: {key: 'GROUP_COMPANY_INSERT', section: ROUTE_SECTIONS.GROUP_COMPANIES, action: ACTION_TYPES.INSERT, label: 'labels.groupCompanyInsert', Icon: Plus, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/group-companies/edit/:idCompany', Element: GroupCompanyInsert, handle: {key: 'GROUP_COMPANY_EDIT', section: ROUTE_SECTIONS.GROUP_COMPANIES, action: ACTION_TYPES.EDIT, label: 'labels.groupCompanyInsert', Icon: Plus, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/work-schedule-types', Element: WorkScheduleTypeList, handle: {key: 'WORK_SCHEDULE_TYPE_LIST', section: ROUTE_SECTIONS.WORK_SCHEDULE_TYPES, action: ACTION_TYPES.VIEW, label: 'labels.workScheduleTypes', Icon: Layers, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.MAIN]}},
  {path: '/work-schedule-types/insert', Element: WorkScheduleTypeInsert, handle: {key: 'WORK_SCHEDULE_TYPE_INSERT', section: ROUTE_SECTIONS.WORK_SCHEDULE_TYPES, action: ACTION_TYPES.INSERT, label: 'labels.workScheduleTypeInsert', Icon: Plus, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/work-schedule-types/edit/:idWorkScheduleType', Element: WorkScheduleTypeInsert, handle: {key: 'WORK_SCHEDULE_TYPE_EDIT', section: ROUTE_SECTIONS.WORK_SCHEDULE_TYPES, action: ACTION_TYPES.EDIT, label: 'labels.workScheduleTypeInsert', Icon: Plus, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/work-schedule-types/:idWorkScheduleType', Element: WorkScheduleTypeDetails, handle: {key: 'WORK_SCHEDULE_TYPE_DETAILS', section: ROUTE_SECTIONS.WORK_SCHEDULE_TYPES, action: ACTION_TYPES.DETAILS, label: 'labels.workScheduleTypeDetails', domain: [AUTH_DOMAINS.PRIVATE], menu: []}},

  {path: '/contracts', Element: ContractList, handle: {key: 'CONTRACT_LIST', section: ROUTE_SECTIONS.CONTRACTS, action: ACTION_TYPES.VIEW, label: 'labels.contractList', Icon: Briefcase, domain: [AUTH_DOMAINS.PRIVATE], menu: [AVAILABLE_MENUS.MAIN]}},
  {path: '/contracts/insert', Element: ContractInsert, handle: {key: 'CONTRACT_INSERT', section: ROUTE_SECTIONS.CONTRACTS, action: ACTION_TYPES.INSERT, label: 'labels.contractInsert', Icon: Plus, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/contracts/edit/:idContract', Element: ContractInsert, handle: {key: 'CONTRACT_EDIT', section: ROUTE_SECTIONS.CONTRACTS, action: ACTION_TYPES.EDIT, label: 'labels.contractInsert', Icon: Plus, domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/contracts/:contractId', Element: ContractDetail, handle: {key: 'CONTRACT_DETAIL', section: ROUTE_SECTIONS.CONTRACTS, action: ACTION_TYPES.DETAILS, label: 'labels.contractDetail', domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
  {path: '/contracts/:contractId/set', Element: SetDetails, handle: {key: 'CONTRACT_SET_DETAILS', section: ROUTE_SECTIONS.CONTRACTS, action: ACTION_TYPES.DETAILS, label: 'labels.contractSetDetails', parentKey: 'CONTRACT_DETAIL', domain: [AUTH_DOMAINS.PRIVATE], menu: []}},
]);

export type SectionRouteEntry = { path: string; label?: string; Icon?: LucideIcon };

export type RoutesBySection = Partial<
  Record<
    ValueOf<typeof ROUTE_SECTIONS>,
    Partial<Record<ValueOf<typeof ACTION_TYPES>, SectionRouteEntry>>
  >
>;

export const routesBySection = ROUTE_CONFIGS
.filter(route => route.handle.domain.includes(AUTH_DOMAINS.PRIVATE))
.reduce<RoutesBySection>((acc, route) => {
  const { section, action, label, Icon } = route.handle;

  acc[section] ??= {};
  acc[section]![action] = { path: route.path, label, Icon };

  return acc;
}, {});


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
