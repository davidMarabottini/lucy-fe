import { generatePath, matchRoutes } from 'react-router-dom';
import {
  ACTION_TYPES,
  ROUTE_CONFIGS,
  ROUTE_SECTIONS,
  routesBySection,
  type AppRouteObject,
} from '@/constants/routes';
import { AUTH_DOMAINS } from '@/constants/configuration';
import type { BreadcrumbItem } from '@/zustand/breadcrumbState';

// only real, private pages can appear in the breadcrumb (menu-only actions have no path to render)
const NAVIGABLE_ROUTES: AppRouteObject[] = ROUTE_CONFIGS.filter(
  (route) => !route.handle.isOnlyMenu && route.handle.domain.includes(AUTH_DOMAINS.PRIVATE)
);

const ROUTE_CONFIG_BY_KEY: Record<string, AppRouteObject> = NAVIGABLE_ROUTES.reduce(
  (acc, route) => {
    acc[route.handle.key] = route;
    return acc;
  },
  {} as Record<string, AppRouteObject>
);

const resolvePath = (route: AppRouteObject, params: Record<string, string | undefined>): string => {
  try {
    return generatePath(route.path, params);
  } catch {
    return route.path;
  }
};

// walks the parentKey chain (e.g. CONTRACT_SET_DETAILS -> CONTRACT_DETAIL) from root to the current route
const getRouteChain = (route: AppRouteObject): AppRouteObject[] => {
  const chain: AppRouteObject[] = [];
  let current: AppRouteObject | undefined = route;

  while (current) {
    chain.unshift(current);
    current = current.handle.parentKey ? ROUTE_CONFIG_BY_KEY[current.handle.parentKey] : undefined;
  }

  return chain;
};

export const buildBreadcrumbTrail = (pathname: string): BreadcrumbItem[] => {
  const homeItem: BreadcrumbItem = { key: 'HOME', label: 'labels.home', path: '/', isCurrent: false };

  const matches = matchRoutes<AppRouteObject>(NAVIGABLE_ROUTES, pathname);
  const currentMatch = matches?.[matches.length - 1];
  const currentRoute = currentMatch?.route;

  if (!currentRoute || currentRoute.handle.section === ROUTE_SECTIONS.HOME) {
    return [{ ...homeItem, isCurrent: true }];
  }

  const { section, action } = currentRoute.handle;
  const items: BreadcrumbItem[] = [homeItem];

  const sectionView = routesBySection[section]?.[ACTION_TYPES.VIEW];
  if (sectionView) {
    items.push({
      key: `${section}_${ACTION_TYPES.VIEW}`,
      label: sectionView.label ?? '',
      path: sectionView.path,
      isCurrent: action === ACTION_TYPES.VIEW,
    });
  }

  if (action !== ACTION_TYPES.VIEW) {
    const chain = getRouteChain(currentRoute);
    chain.forEach((route, index) => {
      items.push({
        key: route.handle.key,
        label: route.handle.label ?? '',
        path: resolvePath(route, currentMatch?.params ?? {}),
        isCurrent: index === chain.length - 1,
      });
    });
  }

  return items;
};
