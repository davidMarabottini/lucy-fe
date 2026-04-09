import styles from "./DualListBox.module.scss";
import clsx from "clsx";
import Typography from "@components/atoms/Typography/Typography";
import { ArrowRight, ArrowLeft } from "lucide-react";
import type { DualListBoxProps } from "./DualListBox.types";

const DualListBox = ({
  label,
  availableTitle,
  selectedTitle,
  options,
  value = [],
  onChange,
  error,
  className,
  //TODO: implementare maxSelections
  // maxSelections,
}: DualListBoxProps) => {
  // const generatedId = useId();

  const handleSelect = (id: number | string) => {
    const isAlreadySelected = value.includes(id);
    const newValue = isAlreadySelected 
      ? value.filter((v) => v !== id) 
      : [...value, id];
    onChange?.(newValue);
  };

  const availableOptions = options.filter((opt) => !value.includes(opt.id));
  const selectedOptions = options.filter((opt) => value.includes(opt.id));

  return (
    <div className={clsx(styles["c-dual-list"], className)}>
      {label && <Typography as="strong" additionalClasses={styles["c-dual-list__label"]}>{label}</Typography>}
      
      <div className={styles["c-dual-list__container"]}>
        {/* Colonna Disponibili */}
        <div className={styles["c-dual-list__column"]}>
          <span className={styles["c-dual-list__column-title"]}>{availableTitle}</span>
          <div className={styles["c-dual-list__list"]}>
            {availableOptions.map((opt) => (
              <div key={opt.id} className={styles["c-dual-list__item"]} onClick={() => handleSelect(opt.id)}>
                {opt.label} <ArrowRight size={14} />
              </div>
            ))}
          </div>
        </div>

        {/* Colonna Selezionati */}
        <div className={styles["c-dual-list__column"]}>
          <span className={styles["c-dual-list__column-title"]}>{selectedTitle}</span>
          <div className={clsx(styles["c-dual-list__list"], styles["c-dual-list__list--selected"])}>
            {selectedOptions.map((opt) => (
              <div key={opt.id} className={styles["c-dual-list__item"]} onClick={() => handleSelect(opt.id)}>
                <ArrowLeft size={14} /> {opt.label}
              </div>
            ))}
          </div>
        </div>
      </div>
      {error && <span className={styles["c-dual-list__error"]}>{error}</span>}
    </div>
  );
};

export default DualListBox;