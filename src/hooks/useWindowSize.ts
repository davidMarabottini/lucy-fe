import { BP_TABLET } from '@constants/configuration';
import { useSyncExternalStore } from 'react';

const subscribe = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

const getSnapshotWidth = () => window.innerWidth;
const getSnapshotUnderTablet = () => window.innerWidth < BP_TABLET;
const getSnapshotHeight = () => window.innerHeight;


const getServerSnapshot = () => 0;
const getServerBooleanSnapshot = () => false;

export const useWindowWidth =() =>
  useSyncExternalStore(subscribe, getSnapshotWidth, getServerSnapshot);

export const useUnderTablet =() =>
  useSyncExternalStore(subscribe, getSnapshotUnderTablet, getServerBooleanSnapshot);

export const useWindowHeight =() =>
  useSyncExternalStore(subscribe, getSnapshotHeight, getServerSnapshot);
