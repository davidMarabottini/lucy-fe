import { useFormContext, type FieldValues } from 'react-hook-form';
import TextArea from '@components/atoms/TextArea/TextArea';
import type { FormTextAreaProps } from '../Form.types';

const FormTextArea = <T extends FieldValues>({ name, rules, ...props }: FormTextAreaProps<T>) => {
  const { register, formState: { errors } } = useFormContext<T>();
  
  const error = errors[name]?.message as string | undefined;

  return (
    <TextArea 
      {...props} 
      {...register(name, rules)} 
      placeholder=" "
      error={error} 
    />
  );
};

export default FormTextArea;