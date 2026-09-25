import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useBreadcrumbStore } from '@/zustand/breadcrumbState';
import { buildBreadcrumbTrail } from '@/utils/breadcrumb';

export const useBreadcrumb = () => {
  const { pathname } = useLocation();
  const items = useBreadcrumbStore((state) => state.items);
  const setItems = useBreadcrumbStore((state) => state.setItems);

  useEffect(() => {
    setItems(buildBreadcrumbTrail(pathname));
  }, [pathname, setItems]);

  return items;
};
