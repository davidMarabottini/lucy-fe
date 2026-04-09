import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { structuredRoutes, type TStructRoute } from './constants/routes';
import { Suspense } from 'react';
import type { LucideIcon } from 'lucide-react';
import { RouteGuard } from './auth/RouteGuard';
import type { ValueOf } from './types/utilities.types';
import type { AUTH_DOMAINS } from './constants/configuration';

export type HandleType = {key: string, label: string, Icon: LucideIcon}

const generateChildren = (routes: Array<{path: string; Element: React.ComponentType; handle?: HandleType;}>) => {
  return routes.map(({path, Element, handle}) => ({
    path,
    element: (
      <Suspense key={handle?.key} fallback={<div>Caricamento...</div>}>
        <Element />
      </Suspense>
    ),
    handle
  }));
};

export const router = createBrowserRouter([{
  element: <MainLayout />,
  children: (Object.keys(structuredRoutes) as TStructRoute[]).map((routesGroup) => (
    {
      element: <RouteGuard key={routesGroup} availableRoutes={routesGroup.split('__')  as ValueOf<typeof AUTH_DOMAINS>[]} />,
      children: generateChildren((structuredRoutes[routesGroup] || [])),
    }
  ))
}])
