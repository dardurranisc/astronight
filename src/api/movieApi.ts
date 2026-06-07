import { Movie } from '@/types/movie';

const baseUrl = 'http://localhost:4000/movies';

export const getMoviesApi = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) throw new Error(`Failed to load movies ${response.status}`);
  const data = await response.json();
  return data;
};

export const addMovieApi = async (movie: Movie) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie),
  });
  if (!response.ok) throw new Error(`Failed to add movie: ${response.status}`);
  return await response.json();
};

export const updateMovieApi = async (movie: Movie) => {
  const response = await fetch(`${baseUrl}/${movie.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie),
  });
  if (!response.ok) throw new Error(`Failed to update movie: ${response.status}`);
  return await response.json();
};

export const deleteMovieApi = async (id: number | string) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(`Failed to delete movie: ${response.status}`);
  return await response.json();
};
