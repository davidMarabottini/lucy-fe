// WorkLocationsMap.types.ts
import type { MapPoint } from '../MapComponent/MapComponent.types';

export interface WorkLocationPoint extends MapPoint {
  radiusInMeters: number;
}

export interface WorkLocationsMapProps {
  locations: WorkLocationPoint[];
  radiusInMeters: number;
  mapStyle?: string;
  className?: string;
  focusedPointId?: string | number | null;
  circleFillColor?: string;
  circleFillOpacity?: number;
  circleStrokeColor?: string;
  renderPointPopup?: (point: WorkLocationPoint) => React.ReactNode;
}