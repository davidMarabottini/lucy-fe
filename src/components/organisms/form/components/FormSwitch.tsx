import { Controller, useFormContext, type FieldValues } from "react-hook-form";
import type { FormSwitchProps } from "../Form.types";
import Switch from "@/components/atoms/Switch/Switch";

const FormSwitch = <T extends FieldValues>({ name, rules, allowIndeterminate, ...props }: FormSwitchProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <Switch
          allowIndeterminate={allowIndeterminate}
          {...props}
          ref={ref}
          value={allowIndeterminate ? value : !!value}
          onChange={onChange}
          error={error?.message}
        />
      )}
    />
  );
};

export default FormSwitch