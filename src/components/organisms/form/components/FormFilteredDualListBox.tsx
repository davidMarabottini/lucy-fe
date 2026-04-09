import { Controller, useFormContext, type FieldValues } from 'react-hook-form';
import FilteredDualListBox from '@components/molecules/FilteredDualListBox/FilteredDualListBox';
import type { FormFilteredDualListBoxProps } from '../Form.types';

const FormFilteredDualListBox = <T extends FieldValues>({ name, rules, ...props }: FormFilteredDualListBoxProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FilteredDualListBox
          {...props}
          value={value || []}
          onChange={onChange}
          error={error?.message}
        />
      )}
    />
  );
};

export default FormFilteredDualListBox;