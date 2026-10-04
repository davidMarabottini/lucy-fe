import type { ValueOf } from "@/types/utilities.types";
import {type LucideIcon} from "lucide-react";
import { AUTH_DOMAINS, AVAILABLE_MENUS } from "./configuration";
import { ACTION_TYPES, ROUTE_CONFIGS, ROUTE_SECTIONS, type AppRouteObject } from "./routeList";
import { getRouteBySection, getRoutes, getStructuredRoutes } from "@/utils/routes";

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

export const routesBySection = getRouteBySection(ROUTE_CONFIGS);


export const structuredRoutes = getStructuredRoutes(ROUTE_CONFIGS);

export const structuredMenu = (() => {
  const dKeys = Object.keys(AUTH_DOMAINS)
  const menuKeys = Object.keys(AVAILABLE_MENUS)
  
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

export const ROUTES = getRoutes(ROUTE_CONFIGS);

