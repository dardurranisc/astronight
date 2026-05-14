import { FormEvent, useState } from 'react';

import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';

import { addMovie, updateMovie, deleteMovie } from '@/store/moviesSlice';

import useField from '@/hooks/useField';
import useImageUpload from '@/hooks/useImageUpload';

import validateForm from '@/utils/validateForm';

import { Movie } from '@/types/movie';

interface UseMovieModal {
  initialMovie?: Movie;
  onClose: () => void;
}

const useMovieModal = ({ initialMovie, onClose }: UseMovieModal) => {
  const isEdit = !!initialMovie;

  const title = useField({
    initialValue: initialMovie?.title || '',
    validateFn: validateForm,
  });

  const director = useField({
    initialValue: initialMovie?.director || '',
  });

  const year = useField({
    initialValue: initialMovie?.year ? String(initialMovie.year) : '',
    validateFn: validateForm,
    replaceFn: (value) => value.replace(/\D/g, ''),
  });

  const actors = useField({
    initialValue: initialMovie?.actors || '',
    validateFn: validateForm,
    replaceFn: (value) => value.split('/').join(','),
  });

  const description = useField({
    initialValue: initialMovie?.description || '',
  });

  const srcImage = useImageUpload({
    initialValue: initialMovie?.src || '',
    validateFn: validateForm,
  });

  const [rating, setRating] = useState(initialMovie?.rating || 0);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(initialMovie?.genre || []);
  const [genresError, setGenresError] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();

  const validateGenres = () => {
    const isValid = selectedGenres.length === 3;
    setGenresError(!isValid ? 'you should complete this area' : '');
    return isValid;
  };

  const isFormValid = (): boolean => {
    [srcImage, title, year, actors].forEach((item) => item.validate(item.field));
    const genresValid = validateGenres();

    return !title.error && !year.error && !actors.error && !srcImage.error && genresValid;
  };

  const resetForm = () => {
    [title, director, year, actors, description, srcImage].forEach((item) => item.reset());
    setRating(0);
    setSelectedGenres([]);
    setGenresError('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) return;

    const movieInformation: Omit<Movie, 'id'> = {
      title: title.field,
      src: srcImage.field,
      alt: title.field,
      rating: rating,
      year: parseInt(year.field, 10),
      director: director.field,
      genre: selectedGenres,
      actors: actors.field,
      description: description.field,
    };

    if (isEdit) {
      const movie = { ...movieInformation, id: initialMovie.id };
      dispatch(updateMovie(movie));
    } else {
      const movie = { ...movieInformation, id: Date.now() };
      dispatch(addMovie(movie));
    }

    resetForm();
    onClose();
  };

  const handleDeleteMovie = () => {
    if (initialMovie) {
      dispatch(deleteMovie(initialMovie.id));
    }
    onClose();
    router.replace('/');
  };

  return {
    title,
    director,
    year,
    actors,
    description,
    srcImage,
    rating,
    selectedGenres,
    genresError,
    setRating,
    setSelectedGenres,
    setGenresError,
    validateGenres,
    isFormValid,
    resetForm,
    handleSubmit,
    handleDeleteMovie,
  };
};

export default useMovieModal;
