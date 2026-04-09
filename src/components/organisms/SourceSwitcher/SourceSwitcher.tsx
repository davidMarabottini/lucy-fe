import type { SourceSwitcherProps } from "./SourceSwitcher.types";
import styles from './SourceSwitcher.module.scss';
import clsx from "clsx";
import RadioBtn from "@/components/atoms/RadioBtn/RadioBtn";
import { useState } from "react";
import DropZone from "@/components/atoms/DropZone/DropZone";
import TextArea from "@/components/atoms/TextArea/TextArea";
import { ICON_PRESET } from "@/components/atoms/RadioBtn/presets/icon.presets";
import Button from "@/components/atoms/Button/Button";
import { useUnderTablet } from "@/hooks/useWindowSize";
import { useOptions } from "@/hooks/useOptions";

const SourceSwitcher = ({handleFiles, handleText, accept, additionalClasses}: SourceSwitcherProps) => {
  const {mailInsert} = useOptions()

  const [type, setType] = useState<string>('file');
  const [message, setMessage] = useState<string>('');
  const underTablet = useUnderTablet();
  return (
    <div className={clsx(styles['c-source-switcher'], "l-grid", additionalClasses)}>
      <RadioBtn
        {...ICON_PRESET}
        className={clsx(styles['c-source-switcher__radiogroup'], "l-grid__col l-grid__col--span-1")}
        gap="md"
        options={mailInsert}
        onValueChange={setType}
        defaultValue={type}
        orientation={underTablet ? "horizontal" : "vertical"}
      />
      
      {type === 'file' && (
        <div className="l-grid__col l-grid__col--span-11">
          <DropZone
            label={"carica il tuo file"}
            handleFiles={value => handleFiles(value)}
            accept={accept}
          />
        </div>
      )}

      {type === 'text' && (
        <div className="l-grid__col l-grid__col--span-11">
          <TextArea onChange={({target}) => setMessage(target.value)} />
          <Button onClick={() => handleText(message)} >Carica</Button>
        </div>
      )}
    </div>
  )
}

export default SourceSwitcher
