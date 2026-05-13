import React, { useState, useMemo } from 'react';
import Map, { Marker, NavigationControl, Popup, Source, Layer } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { MapComponentProps, MapPoint } from './MapComponent.types.ts';
import styles from './MapComponent.module.scss';
import clsx from 'clsx';
import { calculateDistance } from '@/utils/calculateDistance.ts';

const MapComponent: React.FC<MapComponentProps> = ({ workLocation, checkPoints, mapStyle, className }) => {
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);

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

  console.log('MapComponent render', { workLocation, checkPoints, mapStyle });

  return (
    <div className={clsx(styles['c-map-component'], className)}>
      <Map
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
              color="blue"
              onClick={e => {
                e.originalEvent.stopPropagation();
                setSelectedPoint(cp);
              }}
            />

            <Marker 
              longitude={(workLocation.longitude + cp.longitude) / 2} 
              latitude={(workLocation.latitude + cp.latitude) / 2}
              anchor="center"
            >
              <div className={styles['c-map-component__distance-badge']}>
                {calculateDistance([workLocation.latitude, workLocation.longitude], [cp.latitude, cp.longitude])}
              </div>
            </Marker>
          </React.Fragment>
        ))}

        // TODO: tipizzare correttamente
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
