import { Movie } from '@/types/movie';

const sortMoviesField = (movies: Movie[], field: 'title' | 'year' | 'rating' | ''): Movie[] => {
  if (!field) return movies;
  const copy = [...movies];
  switch (field) {
    case 'title':
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case 'year':
      return copy.sort((a, b) => a.year - b.year);
    case 'rating':
      return copy.sort((a, b) => a.rating - b.rating);
    default:
      return movies;
  }
};

export { sortMoviesField };
