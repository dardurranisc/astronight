import { useMemo } from 'react';

import { sortMoviesField } from '@/utils/sortMoviesField';

import { Movie } from '@/types/movie';
import { SortField, SortCase } from '@/types/sorting';

const useFilteredMovies = (
  allMovies: Movie[],
  selectedFilters: string[],
  sortField: SortField,
  sortingCase: SortCase
): Movie[] => {
  return useMemo(() => {
    let current = allMovies;

    if (selectedFilters.length) {
      current = current.filter((movie) =>
        movie.genre.some((genre) => selectedFilters.includes(genre))
      );
    }

    let sorted = sortMoviesField(current, sortField);

    if (sortingCase === 'down') {
      sorted = [...sorted].reverse();
    }

    return sorted;
  }, [allMovies, selectedFilters, sortField, sortingCase]);
};

export default useFilteredMovies;
