import { useAuth } from '@/auth/useAuth';
import { AVAILABLE_MENUS } from '@/constants/configuration';
import type { ValueOf } from '@/types/utilities.types';
import {structuredMenu} from '@constants/routes';
import { useMemo } from 'react';

export const useMenu = (curMenu: ValueOf<typeof AVAILABLE_MENUS> ) => {
  const { domain } = useAuth();
  return useMemo(() => structuredMenu[curMenu]![domain], [curMenu, domain])
}