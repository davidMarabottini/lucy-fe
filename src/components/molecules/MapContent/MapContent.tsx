import { useState } from 'react';
import MapComponent from '@/components/atoms/MapComponent/MapComponent';
import RadioBtn from '@/components/atoms/RadioBtn/RadioBtn';
import type { MapContentProps } from './MapContent.types';
import clsx from 'clsx';
import styles from './MapContent.module.scss';

const mapGraphics = [
  { value: 'https://tiles.openfreemap.org/styles/liberty',  label: 'Liberty'   },
  { value: 'https://tiles.openfreemap.org/styles/positron', label: 'Positron'  },
  { value: 'https://tiles.openfreemap.org/styles/bright',   label: 'Bright'    },
  { value: 'https://demotiles.maplibre.org/style.json',     label: 'Demo tiles' },
];

const MapContent: React.FC<MapContentProps> = ({ headquarter, clockIn, className, focusedPointId }: MapContentProps) => {
  const [mapStyle, setMapStyle] = useState<string>(mapGraphics[0].value);

  return (
    <div className={clsx(styles['c-map-content'], className)}>
      <RadioBtn
        name="map-graphic"
        options={mapGraphics}
        defaultValue={mapGraphics[0].value}
        onValueChange={(value) => setMapStyle(value)}
        orientation="horizontal"
        gap="lg"
      />
      <MapComponent
        workLocation={headquarter}
        checkPoints={clockIn}
        mapStyle={mapStyle}
        focusedPointId={focusedPointId}
      />
    </div>
  );
};

export default MapContent;
