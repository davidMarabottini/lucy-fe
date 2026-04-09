import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/auth/useAuth';
import { ROUTES } from '@/constants/routes';
import { AUTH_DOMAINS } from '@/constants/configuration';
import type { ValueOf } from '@/types/utilities.types';

export interface RouteGuardProps {
  availableRoutes: ValueOf<typeof AUTH_DOMAINS>[]
}

export const RouteGuard = ({availableRoutes}: RouteGuardProps) => {
  const { domain, isLoading } = useAuth();

  if (isLoading) return <div>Caricamento sessione...</div>;

  return availableRoutes.includes(domain) ? <Outlet /> : <Navigate to={ROUTES.HOME} replace />;
};
