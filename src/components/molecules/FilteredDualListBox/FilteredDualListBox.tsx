import { useState, useMemo } from "react";
import Input from "@components/atoms/Input/Input";
import DualListBox from "@components/atoms/DualListBox/DualListBox";
import styles from "./FilteredDualListBox.module.scss";
import clsx from "clsx";
import type { FilteredDualListProps } from "./FilteredDualListBox.types";
import Typography from "@/components/atoms/Typography/Typography";
import { useTranslation } from "react-i18next";

const FilteredDualList = ({
  label,
  availableTitle,
  selectedTitle,
  options,
  value,
  onChange,
  className,
  error,
  filterLabels
}: FilteredDualListProps) => {
  const {t} = useTranslation("components/filteredDualListBox");
  const [filterAvailable, setFilterAvailable] = useState("");
  const [filterSelected, setFilterSelected] = useState("");
  const { available: availableFilterLabel, selected: selectedFilterLabel } = filterLabels || { available: t('filters.available'), selected: t('filters.selected') };

  const filteredOptions = useMemo(() => {
    return options.filter((opt) => {
      const isSelected = value.includes(opt.id);
      const searchTerm = isSelected ? filterSelected : filterAvailable;
      
      return opt.label.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [options, value, filterAvailable, filterSelected]);

  return (
    <div className={clsx(styles["c-filtered-dual-list"], className)}>
      <Typography as="strong">{label}</Typography>
      <div className={styles["c-filtered-dual-list__filters"]}>
        <Input
          placeholder={availableFilterLabel}
          value={filterAvailable}
          onValueChange={setFilterAvailable}
          className={styles["c-filtered-dual-list__filter-input"]}
        />
        <Input
          placeholder={selectedFilterLabel}
          value={filterSelected}
          onValueChange={setFilterSelected}
          className={styles["c-filtered-dual-list__filter-input"]}
        />
      </div>

      <DualListBox
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