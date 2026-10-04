// MapContent.tsx
import { useState } from 'react';
import MapComponent from '@/components/geoMap/MapComponent/MapComponent';
import WorkLocationsMap from '@/components/geoMap/MapMultipleLocation/MapMultipleLocation';
import RadioBtn from '@/components/ui/RadioBtn/RadioBtn';
import type { MapContentProps } from './MapContent.types';
import clsx from 'clsx';
import styles from './MapContent.module.scss';
import { ICON_PRESET } from '@/components/ui/RadioBtn/presets/icon.presets';
import { GlobeIcon, MapIcon } from 'lucide-react';

const mapGraphics = [
  { value: 'https://tiles.openfreemap.org/styles/liberty',  label: 'Liberty',    Icon: MapIcon },
  { value: 'https://tiles.openfreemap.org/styles/positron', label: 'Positron',   Icon: GlobeIcon },
  // { value: 'https://tiles.openfreemap.org/styles/bright',   label: 'Bright',     Icon: Brush },
  // { value: 'https://demotiles.maplibre.org/style.json',     label: 'Demo tiles', Icon: Brush },
];

const MapContent: React.FC<MapContentProps> = ({ mapConfig, className }) => {
  const { classBase, ...iconPresetRest } = ICON_PRESET;
  const [mapStyle, setMapStyle] = useState<string>(mapGraphics[0].value);

  return (
    <div className={clsx(styles['c-map-content'], className)}>
      <RadioBtn
        name="map-graphic"
        options={mapGraphics}
        defaultValue={mapGraphics[0].value}
        onValueChange={(value) => setMapStyle(value)}
        className={classBase}
        gap="lg"
        {...iconPresetRest}
      />

      {mapConfig.mode === 'single' ? (
        <MapComponent
          workLocation={mapConfig.headquarter}
          checkPoints={mapConfig.clockIn}
          mapStyle={mapStyle}
          focusedPointId={mapConfig.focusedPointId}
        />
      ) : (
        <WorkLocationsMap
          locations={mapConfig.locations}
          radiusInMeters={mapConfig.radiusInMeters}
          mapStyle={mapStyle}
          focusedPointId={mapConfig.focusedPointId}
          circleFillColor={mapConfig.circleFillColor}
          circleFillOpacity={mapConfig.circleFillOpacity}
          circleStrokeColor={mapConfig.circleStrokeColor}
          renderPointPopup={mapConfig.renderPointPopup}
        />
      )}
    </div>
  );
};

export default MapContent;
