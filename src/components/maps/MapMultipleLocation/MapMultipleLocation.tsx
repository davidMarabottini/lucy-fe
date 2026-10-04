// WorkLocationsMap.tsx
import React, { useState, useMemo, useRef, useEffect, type ReactNode } from 'react';
import Map, { Marker, NavigationControl, Popup, Source, Layer, type MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { WorkLocationPoint } from './MapMultipleLocation.types';
import { createCircleFeature } from './utils';
import styles from './MapMultipleLocation.module.scss';
import clsx from 'clsx';

export interface WorkLocationsMapProps {
  locations: WorkLocationPoint[];
  mapStyle?: string;
  className?: string;
  focusedPointId?: string | number | null;
  circleFillColor?: string;
  circleFillOpacity?: number;
  circleStrokeColor?: string;
  renderPointPopup?: (point: WorkLocationPoint) => ReactNode;
}

const WorkLocationsMap: React.FC<WorkLocationsMapProps> = ({
  locations = [],
  mapStyle,
  className,
  focusedPointId,
  circleFillColor = '#3b82f6',
  circleFillOpacity = 0.2,
  circleStrokeColor = '#1d4ed8',
  renderPointPopup,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<WorkLocationPoint | null>(null);
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (!locations.length) return;
    const targetPoint = locations.find((loc) => loc.id === focusedPointId) || locations[0];

    if (targetPoint) {
      mapRef.current?.flyTo({
        center: [targetPoint.longitude, targetPoint.latitude],
        zoom: focusedPointId ? 15 : 12,
        duration: 1600,
      });
    }
  }, [focusedPointId, locations]);

  // Genera un cerchio separato per ciascuna location basato sul proprio radiusInMeters
  const circlesGeoJSON = useMemo(() => {
    return {
      type: 'FeatureCollection' as const,
      features: locations.map((loc) => createCircleFeature(loc)),
    };
  }, [locations]);

  const initialLocation = locations[0] ?? { latitude: 0, longitude: 0 };

  return (
    <div className={clsx(styles['c-map-component'], className)}>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: initialLocation.longitude,
          latitude: initialLocation.latitude,
          zoom: 12,
        }}
        mapStyle={mapStyle}
      >
        <NavigationControl position="top-right" />

        <Source id="work-locations-circles" type="geojson" data={circlesGeoJSON}>
          <Layer
            id="circles-fill"
            type="fill"
            paint={{
              'fill-color': circleFillColor,
              'fill-opacity': circleFillOpacity,
            }}
          />
          <Layer
            id="circles-stroke"
            type="line"
            paint={{
              'line-color': circleStrokeColor,
              'line-width': 2,
            }}
          />
        </Source>

        {locations.map((loc) => (
          <Marker
            key={loc.id}
            longitude={loc.longitude}
            latitude={loc.latitude}
            anchor="center"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedPoint(loc);
            }}
          >
            <div
              className={clsx(
                styles['c-map-component__dot'],
                styles['c-map-component__dot--blue'],
                loc.id === focusedPointId && styles['c-map-component__dot--bounce']
              )}
            />
          </Marker>
        ))}

        {renderPointPopup && selectedPoint && (
          <Popup
            longitude={selectedPoint.longitude}
            latitude={selectedPoint.latitude}
            anchor="bottom"
            onClose={() => setSelectedPoint(null)}
            closeOnClick={false}
          >
            {renderPointPopup(selectedPoint)}
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default WorkLocationsMap;