export interface MapPoint {
  id: string | number;
  latitude: number;
  longitude: number;
  label?: string;
  description?: string;
}

export interface MapComponentProps {
  workLocation: MapPoint;
  checkPoints: MapPoint[]; // Entrate e Uscite
  mapStyle?: string;
  className?: string;
}
