import { ChangeEvent } from "react";

import clsx from "clsx";

import styles from "./FormField.module.scss";

interface FormFieldProps {
  variant?: "input" | "textarea";
  value: string;
  error?: string;
  type?: string;
  placeholder: string;
  maxLength?: number;
  rows?: number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const FormField = ({
  variant = "input",
  value,
  error,
  type = "text",
  placeholder,
  maxLength,
  rows,
  onChange,
  onFocus,
  onBlur,
}: FormFieldProps) => {
  return (
    <div className={styles.field}>
      {variant === "input" ? (
        <>
          <input
            className={clsx(styles.input, error && styles.errorInput)}
            placeholder={placeholder}
            type={type}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            value={value}
            maxLength={maxLength}
          />
          {error && <div className={styles.errorMessage}>{error}</div>}
        </>
      ) : (
        <textarea
          className={styles.textArea}
          placeholder={placeholder}
          rows={rows}
          onChange={onChange}
          value={value}
        />
      )}
    </div>
  );
};

export default FormField;
