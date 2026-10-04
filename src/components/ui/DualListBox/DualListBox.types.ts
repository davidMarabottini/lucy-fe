export interface DualListOption {
  id: number | string;
  label: string;
}

export interface DualListBoxProps {
  label?: string;
  availableTitle?: string;
  selectedTitle?: string;
  options: DualListOption[];
  value?: (number | string)[]; // Array di ID selezionati
  onChange?: (newValue: (number | string)[]) => void;
  error?: string;
  className?: string;
  maxSelections?: number;
}