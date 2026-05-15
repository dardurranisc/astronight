import { useState } from 'react';

import useMatchMedia from '@/hooks/useMatchMedia';
import useClickOutside from '@/hooks/useClickOutside';

import { sortData } from './constants/sortData';
import { SortCase, SortField } from '@/types/sorting';

import styles from './SortControls.module.scss';
import SortArrow from '../SortArrow';

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
  const isMobile = useMatchMedia('600px');

  return (
    <div className={styles.sorting}>
      <div className={styles.sortingArrow}>
        <SortArrow
          isMobile={isMobile}
          active={sortingCase === 'up'}
          disable={!sortField}
          direction="up"
          onCaseChange={onCaseChange}
        />
        <SortArrow
          isMobile={isMobile}
          active={sortingCase === 'down'}
          disable={!sortField}
          direction="down"
          onCaseChange={onCaseChange}
        />
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
