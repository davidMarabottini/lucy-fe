import { useFormContext, type FieldValues } from 'react-hook-form';
import Input from '@components/atoms/Input/Input';
import type { FormInputProps } from '../Form.types';

const FormInput = <T extends FieldValues>({ name, rules, ...props }: FormInputProps<T>) => {
  const { register, formState: { errors } } = useFormContext<T>();
  
  const error = errors[name]?.message as string | undefined;

  return (
    <Input 
      {...props} 
      {...register(name, rules)} 
      placeholder=" "
      error={error}
      required={!!rules?.required}
    />
  );
};

export default FormInput;