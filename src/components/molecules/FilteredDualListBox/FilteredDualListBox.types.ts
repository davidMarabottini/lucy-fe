export interface FiltleredDualListOption {
  id: number | string;
  label: string;
}

export interface FilteredDualListProps {
  label?: string;
  availableTitle?: string;
  selectedTitle?: string;
  options: FiltleredDualListOption[];
  value?: (number | string)[]; // Array di ID selezionati
  onChange?: (newValue: (number | string)[]) => void;
  error?: string;
  className?: string;
  maxSelections?: number;
}