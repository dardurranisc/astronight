import Link from 'next/link';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

import clsx from 'clsx';

import { selectAllMovies } from '@/store/moviesSlice';

import useClickOutside from '@/hooks/useClickOutside';
import useMatchMedia from '@/hooks/useMatchMedia';

import Container from '../Container';
import MoviePreviewCard from '../MoviePreviewCard';

import { Movie } from '@/types/movie';

import styles from './SearchModal.module.scss';

interface SearchModalProps {
  onClose: () => void;
}

const SearchModal = ({ onClose }: SearchModalProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const allMovies = useSelector(selectAllMovies);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  const router = useRouter();

  const wrapperRef = useClickOutside(true, onClose);

  const isSearchActive = Boolean(searchValue.length >= 1);

  const isDesktop = useMatchMedia('1024px');
  const maxMoviesForView = isDesktop ? 3 : 5;

  const searchFiltering = (searchValue: string) => {
    if (!searchValue) {
      setFilteredMovies([]);
      return;
    }
    const filtered = allMovies.filter((movie) => {
      return movie.title.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredMovies(filtered);
  };

  const handleClearSearch = () => {
    if (!searchValue) {
      onClose();
    } else {
      setSearchValue('');
    }
  };

  const handleViewAll = () => {
    onClose();
    router.push({
      pathname: '/storage',
      query: { search: searchValue },
    });
  };

  useEffect(() => {
    const handleClickEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleClickEsc);
    return () => window.removeEventListener('keydown', handleClickEsc);
  }, [onClose]);

  return createPortal(
    <div className={styles.overlay}>
      <Container variant="secondary">
        <div className={styles.wrapper} ref={wrapperRef}>
          <div className={styles.search}>
            <input
              ref={(inputRef) => {
                if(inputRef) {
                  inputRef.focus();
                }
              }}
              value={searchValue}
              className={styles.input}
              type="text"
              placeholder="SEARCH"
              onChange={(e) => {
                setSearchValue(e.target.value);
                searchFiltering(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleViewAll();
                }
              }}
            />
            <button
              className={clsx(styles.clearBtn, isSearchActive && styles.clearBtnActive)}
              onClick={handleClearSearch}
            />
          </div>
          {filteredMovies.length >= 1 && (
            <div className={styles.result}>
              <div className={styles.suggestions}>
                <h2>Suggestions</h2>
                <div className={styles.titles}>
                  {filteredMovies &&
                    filteredMovies.slice(0, 5).map((movie) => (
                      <div key={movie.id} className={styles.suggestionTitle}>
                        {movie.title}
                      </div>
                    ))}
                </div>
              </div>
              <div className={styles.movies}>
                {filteredMovies.slice(0, maxMoviesForView).map((movie) => (
                    <Link key={movie.id} href={`/movie/${movie.id}`} onClick={onClose}>
                      <MoviePreviewCard
                        variant="small"
                        title={movie.title}
                        src={movie.src}
                        alt={movie.alt}
                        rating={movie.rating}
                        year={movie.year}
                      />
                    </Link>
                  ))}
              </div>
              <button className={styles.viewBtn} onClick={handleViewAll}>
                View all results
              </button>
            </div>
          )}
          {filteredMovies.length === 0 && Boolean(searchValue) && (
            <div className={styles.resultEmpty}>
              <p>No results could be found. Please try again with a different query.</p>
            </div>
          )}
        </div>
      </Container>
    </div>,
    document.body
  );
};

export default SearchModal;
