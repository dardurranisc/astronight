import { useState } from 'react';

import clsx from 'clsx';

import Button from '../Button';

import { genresData } from '@/constants/genresData';

import styles from './GenresFilters.module.scss';

interface GenresFiltersProps {
  countSelectedFilters: number;
  selectedFilters: string[];
  toggleSelectFilter: (value: string) => void;
}

const GenresFilters = ({
  countSelectedFilters,
  selectedFilters,
  toggleSelectFilter,
}: GenresFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickTitle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.filterBlock}>
      <h2 className={styles.filterTitle} onClick={handleClickTitle}>
        Filter ( {countSelectedFilters} )
      </h2>
      <div className={clsx(styles.filterLists, isOpen && styles.open)}>
        {genresData.map((genre) => (
          <Button
            variant="filter"
            isActiveFilter={selectedFilters.includes(genre.name)}
            text={genre.name}
            key={genre.id}
            onClick={() => toggleSelectFilter(genre.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default GenresFilters;
