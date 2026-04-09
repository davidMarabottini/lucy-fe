export interface SelectOption {
  label: string;
  value: string;
  Icon: string;
}

export interface SelectProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  options: SelectOption[];
  onValueChange?: (value: string) => void;
  error?: string;
  searchable?: boolean;
  renderOption?: (option: SelectOption, isSelected: boolean) => React.ReactNode;
}