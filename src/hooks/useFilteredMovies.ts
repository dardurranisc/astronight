import { useMemo } from 'react';

import { sortMoviesField } from '@/utils/sortMoviesField';

import { Movie } from '@/types/movie';
import { SortField, SortCase } from '@/types/sorting';

const useFilteredMovies = (
  allMovies: Movie[],
  searchValue: string | string[] | undefined,
  selectedFilters: string[],
  sortField: SortField,
  sortingCase: SortCase
): Movie[] => {
  return useMemo(() => {
    let current = allMovies;

    if (searchValue) {
      current = current.filter((movie) =>
        movie.title.toLowerCase().includes((searchValue as string).toLowerCase())
      );
      console.log(searchValue);
    }

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
  }, [allMovies, searchValue, selectedFilters, sortField, sortingCase]);
};

export default useFilteredMovies;
