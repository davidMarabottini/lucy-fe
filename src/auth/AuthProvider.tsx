import { type ReactNode } from 'react';
import { AuthContext } from './authContext';
import { useMe } from '@/hooks/api/useAuthenticationHooks';
import { AUTH_DOMAINS } from '@/constants/configuration';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, isError } = useMe(); 

  const value = {
    user: data?.user,
    isAuthenticated: !!data && !isError,
    isLoading,
    domain: !!data && !isError ? AUTH_DOMAINS.PRIVATE : AUTH_DOMAINS.PUBLIC
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
