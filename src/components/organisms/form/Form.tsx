import { useForm, FormProvider, type FieldValues } from 'react-hook-form';
import type { FormProperties } from './Form.types';
import FormInput from './components/FormInput';
import FormButton from './components/FormButton';
import FormTextArea from './components/FormTextArea';
import FormRadioBtn from './components/FormRadioBtn';
import FormSelect from './components/FormSelect';
import FormSwitch from './components/FormSwitch';
import FormDualListBox from './components/FormDualListBox';
import FormDatePicker from './components/FormDatePicker';
import FormFilteredDualListBox from './components/FormFilteredDualListBox';

const Form = <T extends FieldValues>({ 
  children, 
  onSubmit, 
  noValidate,
  defaultValues,
  values,
  resolver,
  mode,
  reValidateMode,
  context,
  shouldFocusError,
  shouldUnregister,
  shouldUseNativeValidation,
  criteriaMode,
  delayError,
  resetOptions,
  ...props
}: FormProperties<T>) => {
  const methods = useForm<T>({ 
    ...(defaultValues && { defaultValues }),
    ...(values && { values }),
    ...(resolver && { resolver }),
    ...(mode && { mode }),
    ...(reValidateMode && { reValidateMode }),
    ...(context && { context }),
    ...(shouldFocusError !== undefined && { shouldFocusError }),
    ...(shouldUnregister !== undefined && { shouldUnregister }),
    ...(shouldUseNativeValidation !== undefined && { shouldUseNativeValidation }),
    ...(criteriaMode && { criteriaMode }),
    ...(delayError && { delayError }),
    ...(resetOptions && { resetOptions }),
   });

  return (
    <FormProvider {...methods}>
      <form noValidate={noValidate} onSubmit={methods.handleSubmit(data => onSubmit(data, methods))} {...props}>
        {typeof children === 'function' ? children(methods) : children}
      </form>
    </FormProvider>
  );
};

Form.Input = FormInput;
Form.TextArea = FormTextArea;
Form.Button = FormButton;
Form.RadioBtn = FormRadioBtn;
Form.Select = FormSelect;
Form.Switch = FormSwitch;
Form.DualListBox = FormDualListBox;
Form.DatePicker = FormDatePicker;
Form.FilteredDualListBox = FormFilteredDualListBox;

export default Form;
