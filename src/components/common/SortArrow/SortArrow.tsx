import clsx from 'clsx';

import styles from './SortArrow.module.scss';

interface SortArrowProps {
  isMobile: boolean;
  direction: 'up' | 'down';
  active: boolean;
  disable: boolean;
  onCaseChange: (order: 'up' | 'down') => void;
}

const SortArrow = ({ isMobile, direction, active, disable, onCaseChange }: SortArrowProps) => {
  const pathCoordinates = isMobile
    ? 'M1.49979 7.79741L7.87782 1.50023L14.2559 7.79741M8.0596 3.11958L8.0596 19.3115'
    : 'M2.49979 10.278L10.3778 2.49981L18.2559 10.278M10.6024 4.5L10.6023 24.5';
  const svgViewBox = isMobile ? '0 0 16 21' : '0 0 21 27';

  const arrowBtnClass = direction === 'up' ? styles.arrowBtnTop : styles.arrowBtnBottom;

  const svgClass = isMobile ? styles.arrowMobile : styles.arrowDesktop;

  return (
    <div
      className={clsx(arrowBtnClass, disable && styles.arrowDisable)}
      onClick={() => onCaseChange(direction)}
    >
      <svg
        className={clsx(svgClass, active && styles.arrowActive)}
        viewBox={svgViewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={pathCoordinates} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

export default SortArrow;
