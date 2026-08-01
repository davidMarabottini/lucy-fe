import { useState } from 'react';
import MapComponent from '@/components/atoms/MapComponent/MapComponent';
import RadioBtn from '@/components/atoms/RadioBtn/RadioBtn';
import type { MapContentProps } from './MapContent.types';
import clsx from 'clsx';
import styles from './MapContent.module.scss';
import { ICON_PRESET } from "@/components/atoms/RadioBtn/presets/icon.presets";
import { Brush } from 'lucide-react';


const mapGraphics = [
  { value: 'https://tiles.openfreemap.org/styles/liberty',  label: 'Liberty',    Icon: Brush},
  { value: 'https://tiles.openfreemap.org/styles/positron', label: 'Positron',   Icon: Brush},
  { value: 'https://tiles.openfreemap.org/styles/bright',   label: 'Bright',     Icon: Brush},
  { value: 'https://demotiles.maplibre.org/style.json',     label: 'Demo tiles', Icon: Brush},
];

const MapContent: React.FC<MapContentProps> = ({ headquarter, clockIn, className, focusedPointId }: MapContentProps) => {
  const {classBase, ...iconPresetRest} = ICON_PRESET;

  const [mapStyle, setMapStyle] = useState<string>(mapGraphics[0].value);

  return (
    <div className={clsx(styles['c-map-content'], className)}>
      <RadioBtn
        name="map-graphic"
        options={mapGraphics}
        defaultValue={mapGraphics[0].value}
        onValueChange={(value) => setMapStyle(value)}
        className={classBase}
        // orientation="horizontal"
        gap="lg"
        {...iconPresetRest}
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
