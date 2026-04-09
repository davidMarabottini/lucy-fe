import { useFormContext, type FieldValues } from 'react-hook-form';
import Select from '@components/molecules/Select/Select';
import type { FormSelectProps } from '../Form.types';

const FormSelect = <T extends FieldValues>({ name, rules, options, ...props }: FormSelectProps<T>) => {
  const { register, formState: { errors } } = useFormContext<T>();
  const error = errors[name]?.message as string | undefined;

  const { onChange, ref, ...restRegister } = register(name, rules);

  return (
    <Select
      options={options || []}
      {...props}
      {...restRegister}
      ref={ref}
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
