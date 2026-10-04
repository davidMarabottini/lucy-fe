// MapContent.types.ts
import type { MapPoint } from '@/components/geoMap/MapComponent/MapComponent.types';
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
  renderPointPopup?: (point: WorkLocationPoint) => React.ReactNode;
};

export type MapConfig = SingleMapConfig | LocationsMapConfig;

export interface MapContentProps {
  mapConfig: MapConfig;
  className?: string;
}
