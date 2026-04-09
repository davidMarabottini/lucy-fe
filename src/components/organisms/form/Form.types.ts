import type { ReactNode } from "react";
import type { UseFormReturn, FieldValues, Path, DefaultValues, RegisterOptions } from "react-hook-form";
import type { ButtonProps } from "../../atoms/Button/Button.types";
import type { InputProps } from "../../atoms/Input/Input.types";
import type { TextAreaProps } from "../../atoms/TextArea/TextArea.types";
import type { RadioBtnProps, RadioOptionBase } from "../../atoms/RadioBtn/RadioBtn.types";
import type { SelectProps } from "../../molecules/Select/Select.types";
import type { SwitchProps } from "@/components/atoms/Switch/Switch.types";
import type { DualListBoxProps } from "@/components/atoms/DualListBox/DualListBox";
import type { DatePickerProps } from "@/components/atoms/DatePicker/DatePicker";
import type { FilteredDualListProps } from "@/components/molecules/FilteredDualListBox/FilteredDualListBox.types";

type FormBase = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'children' | 'onSubmit'>;

export interface FormProperties<T extends FieldValues> extends FormBase {
  children: ReactNode | ((methods: UseFormReturn<T>) => ReactNode);
  onSubmit: (data: T, methods: UseFormReturn<T>) => void;
  defaultValues?: DefaultValues<T>;
  noValidate?: boolean;
}

interface FormBaseElements<T extends FieldValues> {
  name: Path<T>;
  rules?: RegisterOptions<T, Path<T>>;
}


export interface FormInputProps<T extends FieldValues> extends Omit<InputProps, 'placeholder' | 'name'>, FormBaseElements<T> {};
export interface FormTextAreaProps<T extends FieldValues> extends Omit<TextAreaProps, 'placeholder' | 'name'>, FormBaseElements<T> {}
export interface FormRadioBtnProps<T extends FieldValues, RadioOption extends RadioOptionBase> extends Omit<RadioBtnProps<RadioOption>, 'placeholder' | 'name'>, FormBaseElements<T> {}
export interface FormSelectProps<T extends FieldValues> extends Omit<SelectProps, 'placeholder' | 'name'>, FormBaseElements<T> {}

export interface FormSwitchProps<T extends FieldValues> extends Omit<SwitchProps, 'onChange' | 'name'>, FormBaseElements<T> {
  onChange?: (value: SwitchProps) => void;
}

export interface FormButtonProps extends ButtonProps {
  autoDisabled?: boolean
}

export interface FormDualListBoxProps<T extends FieldValues> 
  extends Omit<DualListBoxProps, 'value' | 'onChange' | 'error'>, FormBaseElements<T> {}

  export interface FormFilteredDualListBoxProps<T extends FieldValues> 
  extends Omit<FilteredDualListProps, 'value' | 'onChange' | 'error'>, FormBaseElements<T> {}

export interface FormDatePicker<T extends FieldValues> 
  extends Omit<DatePickerProps, 'value' | 'onChange' | 'error'>, FormBaseElements<T> {}
