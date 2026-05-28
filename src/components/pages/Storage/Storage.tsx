import { useRouter } from 'next/router';

import { useState, useMemo } from 'react';

import { useSelector } from 'react-redux';
import { selectAllMovies } from '@/store/moviesSlice';

import clsx from 'clsx';

import useFilteredMovies from '@/hooks/useFilteredMovies';

import Section from '@/components/common/Section';
import Background from '@/components/common/Background';
import Container from '@/components/common/Container';
import SortControls from '@/components/common/SortControls';
import GenresFilters from '@/components/common/GenresFilters';
import MoviesGridCarousel from '@/components/common/MoviesGridCarousel';

import { SortCase, SortField } from '@/types/sorting';

import styles from './Storage.module.scss';

const Storage = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField>('');
  const [sortingCase, setSortingCase] = useState<SortCase>('up');
  const allMovies = useSelector(selectAllMovies);
  const router = useRouter();
  const searchValue = (router.query.search || "") as string;
  const isSearchActive = Boolean(searchValue);
  const sortedMovies = useFilteredMovies(
    allMovies,
    searchValue,
    selectedFilters,
    sortField,
    sortingCase
  );

  const countSelectedFilters = selectedFilters.length;
  const countAllMovies = allMovies.length;
  const countSortedMovies = sortedMovies.length;

  const toggleSelectFilter = (value: string) => {
    setSelectedFilters((prev) =>
      prev.includes(value) ? prev.filter((prev) => prev !== value) : [...prev, value]
    );
  };

  const resultInfo = useMemo(() => {
    const hasFilters = countSelectedFilters >= 1;

    if (hasFilters && countSortedMovies === 0) {
      return 'No objects match those filters.';
    }

    const totalCount = hasFilters || isSearchActive ? countSortedMovies : countAllMovies;
    const searchCase = isSearchActive ? `for "${searchValue}"` : '';

    return `${totalCount} objects found ${searchCase}`;
  }, [isSearchActive, searchValue, countSelectedFilters, countSortedMovies, countAllMovies]);

  const isEmpty = sortedMovies.length === 0;

  return (
    <div className={styles.pageContent}>
      <Section>
        <Container variant="secondary">
          <GenresFilters
            countSelectedFilters={countSelectedFilters}
            selectedFilters={selectedFilters}
            toggleSelectFilter={toggleSelectFilter}
          />
        </Container>
      </Section>
      <Section className={clsx(styles.spaceWithMarginBottom, isEmpty && styles.minusMarginBottom)}>
        <Background
          variant="dynamic"
          src="/images/storage/background.png"
          alt="background"
          fill
          priority
          opacity={0.3}
        />
        <Container variant="secondary">
          <div className={styles.wrapper}>
            <div className={styles.resultControls}>
              <p className={styles.info}>{resultInfo}</p>
              <SortControls
                sortField={sortField}
                sortingCase={sortingCase}
                onFieldChange={setSortField}
                onCaseChange={setSortingCase}
              />
            </div>
            <MoviesGridCarousel sortedMovies={sortedMovies} />
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Storage;
