import React, { useState, useMemo, useRef, useEffect } from 'react';
import Map, { Marker, NavigationControl, Popup, Source, Layer, type MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { MapComponentProps, MapPoint } from './MapComponent.types.ts';
import styles from './MapComponent.module.scss';
import clsx from 'clsx';
// import { calculateDistance } from '@/utils/calculateDistance.ts';

const MapComponent: React.FC<MapComponentProps> = ({ workLocation, checkPoints, mapStyle, className, focusedPointId }) => {
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (focusedPointId == null) return;
    const point = checkPoints.find(cp => cp.id === focusedPointId)
      ?? (workLocation.id === focusedPointId ? workLocation : null);
    if (point) {
      mapRef.current?.flyTo({
        center: [point.longitude, point.latitude],
        zoom: 16,
        duration: 1600,
      });
    }
  }, [focusedPointId]);

  const linesData = useMemo(() => {
    return {
      type: 'FeatureCollection',
      features: checkPoints.map(cp => ({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [workLocation.longitude, workLocation.latitude],
            [cp.longitude, cp.latitude]
          ]
        }
      }))
    };
  }, [workLocation, checkPoints]);

  return (
    <div className={clsx(styles['c-map-component'], className)}>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: workLocation.longitude,
          latitude: workLocation.latitude,
          zoom: 1
        }}
        mapStyle={mapStyle}
      >
        <NavigationControl position="top-right" />

        <Marker 
          longitude={workLocation.longitude} 
          latitude={workLocation.latitude} 
          color="red"
          onClick={e => {
            e.originalEvent.stopPropagation();
            setSelectedPoint(workLocation);
          }}
        />

        {checkPoints.map(cp => (
          <React.Fragment key={cp.id}>
            <Marker 
              longitude={cp.longitude} 
              latitude={cp.latitude} 
              anchor="bottom"
              onClick={e => {
                e.originalEvent.stopPropagation();
                setSelectedPoint(cp);
              }}
            >
              <div
                className={clsx(
                  styles['c-map-component__dot'],
                  styles['c-map-component__dot--blue'],
                  cp.id === focusedPointId && styles['c-map-component__dot--bounce']
                )}
              />
            </Marker>

            {/*<Marker 
              longitude={(workLocation.longitude + cp.longitude) / 2} 
              latitude={(workLocation.latitude + cp.latitude) / 2}
              anchor="center"
            >
               <div className={styles['c-map-component__distance-badge']}>
                {calculateDistance([workLocation.latitude, workLocation.longitude], [cp.latitude, cp.longitude])}
              </div> 
            </Marker>*/}
          </React.Fragment>
        ))}

        <Source id="lines-source" type="geojson" data={linesData as any}>
          <Layer
            id="lines-layer"
            type="line"
            paint={{
              'line-color': '#888',
              'line-width': 2,
              'line-dasharray': [2, 2]
            }}
          />
        </Source>

        {selectedPoint && (
          <Popup
            longitude={selectedPoint.longitude}
            latitude={selectedPoint.latitude}
            anchor="bottom"
            onClose={() => setSelectedPoint(null)}
            closeOnClick={false}
          >
            <div className={styles['c-map-component__popup-content']}>
              <strong>{selectedPoint.label}</strong>
              <p>{selectedPoint.description}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapComponent;
