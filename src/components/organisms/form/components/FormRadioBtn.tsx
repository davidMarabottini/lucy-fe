import { Controller, useFormContext, type FieldValues } from 'react-hook-form';
import RadioBtn from '@components/atoms/RadioBtn/RadioBtn';
import type { FormRadioBtnProps } from '../Form.types';
import type { RadioOptionBase } from '@/components/atoms/RadioBtn/RadioBtn.types';


const FormRadioBtn = <T extends FieldValues, RadioOption extends RadioOptionBase>({ name, rules, options, ...props }: FormRadioBtnProps<T, RadioOption>) => {
  const { control, formState: { errors } } = useFormContext<T>();
  const error = errors[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <RadioBtn
          {...props}
          options={options || []}
          value={field.value}
          onValueChange={field.onChange}
          error={error}
        />
      )}
    />
  );
};
export default FormRadioBtn;
