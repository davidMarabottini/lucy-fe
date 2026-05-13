import type { MapPoint } from '@/components/atoms/MapComponent/MapComponent.types';

export type { MapPoint };

export interface ClockInPoint extends MapPoint {
  type: 'start' | 'end';
}

export interface MapContentProps {
  headquarter: MapPoint;
  clockIn: ClockInPoint[];
  trackLine?: boolean;
  className?: string;
}
