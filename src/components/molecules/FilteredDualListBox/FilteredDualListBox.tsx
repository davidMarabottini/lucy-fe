import { useState, useMemo } from "react";
import Input from "@components/atoms/Input/Input";
import DualListBox from "@components/atoms/DualListBox/DualListBox";
import styles from "./FilteredDualListBox.module.scss";
import clsx from "clsx";
import type { FilteredDualListProps } from "./FilteredDualListBox.types";
import Typography from "@/components/atoms/Typography/Typography";

const FilteredDualList = ({
  label,
  availableTitle,
  selectedTitle,
  options,
  value,
  onChange,
  className,
  error,
}: FilteredDualListProps) => {
  const [filterAvailable, setFilterAvailable] = useState("");
  const [filterSelected, setFilterSelected] = useState("");

  // Filtriamo le opzioni in base agli input di ricerca
  const filteredOptions = useMemo(() => {
    return options.filter((opt) => {
      const isSelected = value.includes(opt.id);
      const searchTerm = isSelected ? filterSelected : filterAvailable;
      
      return opt.label.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [options, value, filterAvailable, filterSelected]);

  return (
    <div className={clsx(styles["c-filtered-dual-list"], className)}>
      {/* Header con i due filtri */}
      <Typography as="strong">{label}</Typography>
      <div className={styles["c-filtered-dual-list__filters"]}>
        <Input
          placeholder="Cerca tra i disponibili..."
          value={filterAvailable}
          onValueChange={setFilterAvailable}
          className={styles["c-filtered-dual-list__filter-input"]}
        />
        <Input
          placeholder="Cerca tra i selezionati..."
          value={filterSelected}
          onValueChange={setFilterSelected}
          className={styles["c-filtered-dual-list__filter-input"]}
        />
      </div>

      {/* Il componente DualListBox riceve solo le opzioni già filtrate */}
      <DualListBox
        // label={label}
        availableTitle={availableTitle}
        selectedTitle={selectedTitle}
        options={filteredOptions}
        value={value}
        onChange={onChange}
        error={error}
      />
    </div>
  );
};

export default FilteredDualList;