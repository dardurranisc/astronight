import { useState } from 'react';
import { ChangeEvent } from 'react';

import { readAsDataURL } from '@/utils/readAsDataURL';

interface UseImageUploadProps {
  initialValue: string;
  validateFn: (value: string) => string | undefined;
}

const useImageUpload = ({ initialValue, validateFn }: UseImageUploadProps) => {
  const [field, setField] = useState(initialValue);
  const [imageFocused, setImageFocused] = useState(false);
  const [error, setError] = useState('');

  const validate = (value: string) => {
    if (validateFn) {
      const error = validateFn(value);
      setError(error || '');
    }
  };

  const editValue = (value: string) => {
    setField(value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readAsDataURL({ file, setField });
    setError('');
  };

  const handleImageBlur = () => {
    setImageFocused(false);
    validate(field);
  };

  const handleImageFocus = () => {
    setImageFocused(true);
    setError('');
  };

  const reset = () => {
    setField(initialValue);
    setError('');
  };

  return {
    field,
    setField,
    imageFocused,
    error,
    editValue,
    validate,
    handleImageBlur,
    handleImageChange,
    handleImageFocus,
    reset,
  };
};

export default useImageUpload;
