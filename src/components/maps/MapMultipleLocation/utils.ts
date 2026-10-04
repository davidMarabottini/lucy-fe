import type { WorkLocationPoint } from './MapMultipleLocation.types';

export function createCircleFeature(location: WorkLocationPoint, steps = 64) {
  const coords = [];
  const km = location.radiusInMeters / 1000;
  const distanceX = km / (111.320 * Math.cos((location.latitude * Math.PI) / 180));
  const distanceY = km / 110.574;

  for (let i = 0; i < steps; i++) {
    const theta = (i / steps) * (2 * Math.PI);
    const x = distanceX * Math.cos(theta);
    const y = distanceY * Math.sin(theta);
    coords.push([location.longitude + x, location.latitude + y]);
  }
  coords.push(coords[0]);

  return {
    type: 'Feature' as const,
    properties: { id: location.id, label: location.label, radius: location.radiusInMeters },
    geometry: {
      type: 'Polygon' as const,
      coordinates: [coords],
    },
  };
}