import { useFormContext, useWatch, type FieldValues } from 'react-hook-form';
import Select from '@components/molecules/Select/Select';
import type { FormSelectProps } from '../Form.types';

const FormSelect = <T extends FieldValues>({ name, rules, options, ...props }: FormSelectProps<T>) => {
  const { control, register, formState: { errors } } = useFormContext<T>();
  const error = errors[name]?.message as string | undefined;

  // Ascolta il valore corrente nel form (gestisce sia defaultValues che reset/setValue)
  const fieldValue = useWatch({ control, name });

  const { onChange, ref, ...restRegister } = register(name, rules);

  return (
    <Select
      options={options || []}
      {...props}
      {...restRegister}
      ref={ref}
      defaultValue={fieldValue} // Passa il valore del form come defaultValue
      required={!!rules?.required}
      onValueChange={(val: string) => {
        onChange({ 
          target: { name, value: val },
          type: 'change'
        });
      }}
      error={error} 
    />
  );
};

export default FormSelect;