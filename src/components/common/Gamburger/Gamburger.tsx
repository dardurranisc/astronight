import clsx from 'clsx';

import styles from './Gamburger.module.scss';

interface GamburgerProps {
  isOpen: boolean;
  ariaLabel: string;
  onClick: () => void;
}

const Gamburger = ({ isOpen, ariaLabel, onClick }: GamburgerProps) => {
  return (
    <button
      className={clsx(styles.gamburger, isOpen && styles.open)}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <span />
    </button>
  );
};

export default Gamburger;
