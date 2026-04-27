import { ChangeEvent } from 'react';

import clsx from 'clsx';

import styles from './ImageUpload.module.scss';

interface ImageUploadProps {
  value?: string;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const ImageUpload = ({ value, error, onChange, onFocus, onBlur }: ImageUploadProps) => {
  return (
    <div
      className={clsx(styles.imageSection, error && styles.errorInput)}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <label className={styles.uploadLabel}>
        {value ? (
          <div className={styles.wrapper}>
            <div className={styles.circle} />
            <span>replace image</span>
            <img className={styles.imagePreview} src={value} alt="PreviewMovie" />
          </div>
        ) : (
          <>
            <div className={styles.wrapper}>
              <div className={styles.circle} />
              <span>upload image</span>
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
          </>
        )}
        <input type="file" accept="image/*" className={styles.inputUpload} onChange={onChange} />
      </label>
    </div>
  );
};

export default ImageUpload;
