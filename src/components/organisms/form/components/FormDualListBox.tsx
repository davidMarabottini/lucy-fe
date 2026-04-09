import { Controller, useFormContext, type FieldValues } from 'react-hook-form';
import DualListBox from '@components/atoms/DualListBox/DualListBox';
import type { FormDualListBoxProps } from '../Form.types';

const FormDualListBox = <T extends FieldValues>({ name, rules, ...props }: FormDualListBoxProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <DualListBox
          {...props}
          value={value || []}
          onChange={onChange}
          error={error?.message}
        />
      )}
    />
  );
};

export default FormDualListBox;