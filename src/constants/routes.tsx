import type { ValueOf } from "@/types/utilities.types";
import {type LucideIcon} from "lucide-react";
import { AUTH_DOMAINS, AVAILABLE_MENUS } from "./configuration";
import { ACTION_TYPES, ROUTE_CONFIGS, ROUTE_SECTIONS, type AppRouteObject } from "./routeList";

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
