import { useState, useMemo, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { selectAllMovies } from '@/store/moviesSlice';

import useFilteredMovies from '@/hooks/useFilteredMovies';

import Section from '@/components/common/Section';
import Background from '@/components/common/Background';
import Container from '@/components/common/Container';
import SortControls from '@/components/common/SortControls';
import GenresFilters from '@/components/common/GenresFilters';
import MoviesGridCarousel from '@/components/common/MoviesGridCarousel';
import Footer from '@/components/common/Footer';

import { SortCase, SortField } from '@/types/sorting';

import styles from './movieStorage.module.scss';

const MovieStorage = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField>('');
  const [sortingCase, setSortingCase] = useState<SortCase>('up');
  const allMovies = useSelector(selectAllMovies);
  const sortedMovies = useFilteredMovies(allMovies, selectedFilters, sortField, sortingCase);

  const countSelectedFilters = selectedFilters.length;
  const countAllMovies = allMovies.length;
  const countSortedMovies = sortedMovies.length;

  const toggleSelectFilter = (value: string) => {
    setSelectedFilters((prev) =>
      prev.includes(value) ? prev.filter((prev) => prev !== value) : [...prev, value]
    );
  };

  const isEmpty = sortedMovies.length === 0;

  useEffect(() => {
    if (isEmpty) {
      document.body.classList.add('hideGlobalFooter');
    } else {
      document.body.classList.remove('hideGlobalFooter');
    }
    return () => document.body.classList.remove('hideGlobalFooter');
  }, [isEmpty]);

  const resultInfo = useMemo(() => {
    const hasFilters = countSelectedFilters >= 1;

    if (hasFilters && countSortedMovies === 0) {
      return 'No objects match those filters.';
    }

    const totalCount = hasFilters ? countSortedMovies : countAllMovies;
    return `${totalCount} objects found`;
  }, [countSelectedFilters, countSortedMovies, countAllMovies]);

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
      {isEmpty ? (
        <div className={styles.emptyContainer}>
          <Background
            variant="default"
            src="/images/movieStorage/background-stars.png"
            alt="background"
            fill
            priority
            opacity={0.3}
          />
          <Section className={styles.emptySection}>
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
              </div>
            </Container>
          </Section>
          <Footer isGlobal={false} />
        </div>
      ) : (
        <Section className={styles.spaceWithMarginBottom}>
          <Background
            variant="dynamic"
            src="/images/movieStorage/background.png"
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
      )}
    </div>
  );
};

export default MovieStorage;
