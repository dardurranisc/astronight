import { useState } from "react";
import { ChangeEvent } from "react";

const useField = (
  initialValue: string,
  validateFn?: (value: string) => string | undefined,
  replaceFn?: (value: string) => string,
) => {
  const [field, setField] = useState(initialValue);
  const [error, setError] = useState("");

  const validate = (value: string) => {
    if (validateFn) {
      const error = validateFn(value);
      setError(error || "");
    }
    return error;
  };

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let newValue = e.target.value;
    if (replaceFn) {
      newValue = replaceFn(newValue);
    }
    setField(newValue);
    setError("");
  };

  const handleFieldBlur = () => {
    validate(field);
  };

  const handleFieldFocus = () => {
    setError("");
  };

  const reset = () => {
    setField(initialValue);
    setError("");
  };

  return {
    field,
    error,
    validate,
    handleFieldChange,
    handleFieldBlur,
    handleFieldFocus,
    reset,
  };
};

export default useField;
