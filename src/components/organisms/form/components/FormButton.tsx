import { useFormContext } from 'react-hook-form';
import Button from '@components/atoms/Button/Button';
import type { FormButtonProps } from '../Form.types';

const FormButton = ({ children, autoDisabled=true, disabled, type, ...props }: FormButtonProps) => {
  const { formState: { isSubmitting, isValid } } = useFormContext();

  const isDisabled = (autoDisabled && !isValid) || isSubmitting || disabled

  return (
    <Button 
      {...props} 
      type={type || 'submit'}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={isSubmitting}
    >
      {children}
    </Button>
  );
};

export default FormButton;
