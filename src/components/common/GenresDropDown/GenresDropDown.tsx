import { useEffect, useState, useRef } from 'react';

import clsx from 'clsx';

import { genresList } from './constants/genresData';

import styles from './GenresDropDown.module.scss';

interface GenresDropDownProps {
  selected: string[];
  error?: boolean;
  onChange: (selected: string[]) => void;
}

const GenresDropDown = ({ selected, error, onChange }: GenresDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [countSelected, setCountSelected] = useState(0);

  const showError = error && !isOpen;
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleGenre = (genre: string) => {
    if (selected.includes(genre)) {
      onChange(selected.filter((g) => g !== genre));
    } else {
      if (selected.length < 3) {
        onChange([...selected, genre]);
      } else {
        alert('Можно выбрать не более 3 жанров');
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    setCountSelected(selected.length);
  }, [selected]);

  return (
    <div
      className={clsx(styles.block, isOpen && styles.blockOpen, showError && styles.errorBlock)}
      ref={containerRef}
    >
      {isOpen ? (
        <>
          <div className={styles.blockHeader} onClick={() => setIsOpen(!isOpen)}>
            <div>{countSelected} tags</div>
            <img
              className={styles.arrow}
              style={{ transform: `rotate(180deg)` }}
              src="/images/arrow/arrowDown.svg"
              alt="ArrowDown"
            />
          </div>
          <div className={styles.selectDown}>
            <div className={styles.selectLists}>
              {genresList.map((genre) => (
                <label
                  className={clsx(
                    styles.selectList,
                    selected.includes(genre.name) && styles.selected
                  )}
                  key={genre.id}
                >
                  {genre.name}
                  <input
                    className={styles.listCheckbox}
                    type="checkbox"
                    checked={selected.includes(genre.name)}
                    onChange={() => toggleGenre(genre.name)}
                    required
                  />
                  {selected.includes(genre.name) && (
                    <img src="/images/checkbox/checkbox.svg" alt="CheckMark" />
                  )}
                </label>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className={styles.blockHeader} onClick={() => setIsOpen(!isOpen)}>
          <div className={clsx(styles.placeholder, showError && styles.placeholderError)}>
            {countSelected > 0
              ? `${countSelected} ${countSelected === 1 ? 'tag' : 'tags'}`
              : 'genres*'}
          </div>
          <img
            className={clsx(styles.arrow, showError && styles.arrowError)}
            src="/images/arrow/arrowDown.svg"
            alt="ArrowDown"
          />
        </div>
      )}
    </div>
  );
};

export default GenresDropDown;
