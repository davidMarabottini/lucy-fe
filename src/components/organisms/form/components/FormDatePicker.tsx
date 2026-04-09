import { Controller, useFormContext, type FieldValues } from "react-hook-form";
import DatePicker from "@components/atoms/DatePicker/DatePicker";
import type { FormDatePicker } from "../Form.types";


const FormDatePicker = <T extends FieldValues>({ 
  name, 
  rules, 
  selectsRange, 
  ...props 
}: FormDatePicker<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const [start, end] = Array.isArray(value) ? value : [value, null];

        return (
          <DatePicker
            {...props}
            startDate={start}
            endDate={end}
            selectsRange={selectsRange}
            onChange={onChange}
            error={error?.message}
          />
        );
      }}
    />
  );
};

export default FormDatePicker;