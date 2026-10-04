import { AUTH_DOMAINS } from "@/constants/configuration";
import { type AppRouteObject } from "@/constants/routeList";
import type { RouteHandle, RoutesBySection } from "@/constants/routes";
import type { ValueOf } from "@/types/utilities.types";

export const rewriteRoute = (route: string, values: {[name: string]: string}): string =>
  Object.keys(values).reduce((acc, x) => acc.replace(x, values[x]), route)

export const getRouteBySection = (config: readonly AppRouteObject[]) => config.filter(route => route.handle.domain.includes(AUTH_DOMAINS.PRIVATE))
.reduce<RoutesBySection>((acc, route) => {
  const { section, action, label, Icon } = route.handle;

  acc[section] ??= {};
  acc[section]![action] = { path: route.path, label, Icon };

  return acc;
}, {});

export type TStructRoute = ValueOf<typeof AUTH_DOMAINS> | `${ValueOf<typeof AUTH_DOMAINS>}__${ValueOf<typeof AUTH_DOMAINS>}`

type StructuredRoutes = Record<TStructRoute, AppRouteObject[]>;


export const getStructuredRoutes = (config: readonly AppRouteObject[]) => config.reduce((acc, route) => {
  const key = route.handle.domain.toSorted().join('__') as TStructRoute;

  if (!acc[key]) {
    acc[key] = [];
  }

  acc[key].push(route);

  return acc;
}, {} as StructuredRoutes);

export const getRoutes = (ROUTE_CONFIGS: readonly AppRouteObject[]) => ROUTE_CONFIGS.reduce((acc, { handle, path }: AppRouteObject) => {
  if(!handle.isOnlyMenu) acc[handle.key] = path;
  return acc;
}, {} as Record<RouteHandle['key'], string>);