import { useState } from 'react';

import clsx from 'clsx';

import useClickOutside from '@/hooks/useClickOutside';

import { sortData } from './constants/sortData';
import { SortCase, SortField } from '@/types/sorting';

import styles from './SortControls.module.scss';

interface SortControlsProps {
  sortField: string;
  sortingCase: string;
  onFieldChange: (field: SortField) => void;
  onCaseChange: (order: SortCase) => void;
}

const SortControls = ({
  sortField,
  sortingCase,
  onFieldChange,
  onCaseChange,
}: SortControlsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useClickOutside(isOpen, () => setIsOpen(!isOpen));

  return (
    <div className={styles.sorting}>
      <div className={styles.sortingArrow}>
        <div
          className={clsx(styles.arrowBtnTop, !sortField && styles.arrowDisable)}
          onClick={() => onCaseChange('up')}
        >
          <svg
            className={clsx(styles.arrowTop, sortingCase === 'up' && styles.arrowActive)}
            viewBox="0 0 21 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.49979 10.278L10.3778 2.49981L18.2559 10.278M10.6024 4.5L10.6023 24.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            className={clsx(styles.arrowTopMobile, sortingCase === 'up' && styles.arrowActive)}
            viewBox="0 0 16 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.49979 7.79741L7.87782 1.50023L14.2559 7.79741M8.0596 3.11958L8.0596 19.3115"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          className={clsx(styles.arrowBtnBottom, !sortField && styles.arrowDisable)}
          onClick={() => onCaseChange('down')}
        >
          <svg
            className={clsx(styles.arrowBottom, sortingCase === 'down' && styles.arrowActive)}
            viewBox="0 0 21 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.49979 10.278L10.3778 2.49981L18.2559 10.278M10.6024 4.5L10.6023 24.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            className={clsx(styles.arrowBottomMobile, sortingCase === 'down' && styles.arrowActive)}
            viewBox="0 0 16 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.49979 7.79741L7.87782 1.50023L14.2559 7.79741M8.0596 3.11958L8.0596 19.3115"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className={styles.sort} ref={containerRef}>
        <button className={styles.sortButton} onClick={() => setIsOpen(!isOpen)}>
          {sortField || 'sort by'}
        </button>
        {isOpen && (
          <ul className={styles.dropDownBlock}>
            {sortData.map((sort) => (
              <li
                key={sort.id}
                className={styles.dropDownList}
                onClick={() => {
                  onFieldChange(sort.name);
                  setIsOpen(false);
                }}
              >
                {sort.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SortControls;
