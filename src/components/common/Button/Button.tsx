import clsx from 'clsx';

import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  ariaLabel?: string;
  isActiveFilter?: boolean;
  variant?: 'default' | 'secondary' | 'tertiary' | 'filter';
  type?: 'button' | 'submit';
  onClick?: () => void;
}

const Button = ({
  text,
  ariaLabel,
  isActiveFilter,
  variant = 'default',
  type = 'button',
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], isActiveFilter && styles.filterActive)}
      onClick={onClick}
      aria-label={ariaLabel}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
