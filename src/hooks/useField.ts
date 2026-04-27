import { useState } from 'react';
import { ChangeEvent } from 'react';

interface UseFiledProps {
  initialValue: string | undefined;
  validateFn?: (value: string) => string | undefined;
  replaceFn?: (value: string) => string;
}

const useField = ({ initialValue, validateFn, replaceFn }: UseFiledProps) => {
  const [field, setField] = useState(initialValue || '');
  const [error, setError] = useState('');

  const validate = (value: string) => {
    if (validateFn) {
      const error = validateFn(value ? value : '');
      setError(error || '');
    }
    return error;
  };

  const editValue = (newValue: string) => {
    setField(newValue);
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let newValue = e.target.value;
    if (replaceFn) {
      newValue = replaceFn(newValue);
    }
    setField(newValue);
    setError('');
  };

  const handleFieldBlur = () => {
    validate(field);
  };

  const handleFieldFocus = () => {
    setError('');
  };

  const reset = () => {
    setField(initialValue || '');
    setError('');
  };

  return {
    field,
    error,
    editValue,
    validate,
    handleFieldChange,
    handleFieldBlur,
    handleFieldFocus,
    reset,
  };
};

export default useField;
