// MapContent.types.ts
import type { MapPoint } from '@/components/atoms/MapComponent/MapComponent.types';
import type { WorkLocationPoint } from '@/components/geoMap/MapMultipleLocation/MapMultipleLocation.types';

export type SingleMapConfig = {
  mode: 'single';
  headquarter: MapPoint;
  clockIn?: MapPoint[];
  focusedPointId?: string | number | null;
};

export type LocationsMapConfig = {
  mode: 'locations';
  locations: WorkLocationPoint[];
  radiusInMeters: number;
  focusedPointId?: string | number | null;
  circleFillColor?: string;
  circleFillOpacity?: number;
  circleStrokeColor?: string;
};

export type MapConfig = SingleMapConfig | LocationsMapConfig;

export interface MapContentProps {
  mapConfig: MapConfig;
  className?: string;
}

// import type { MapPoint } from '@/components/atoms/MapComponent/MapComponent.types';

// export type { MapPoint };

// export interface ClockInPoint extends MapPoint {
//   type: 'start' | 'end';
// }

// export interface MapContentProps {
//   headquarter?: MapPoint;
//   clockIn?: ClockInPoint[];
//   trackLine?: boolean;
//   className?: string;
//   focusedPointId?: string | number | null;
// }
