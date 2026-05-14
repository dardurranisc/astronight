import { useState } from 'react';

import { createPortal } from 'react-dom';

import useMovieModal from '@/hooks/useMovieModal';

import ConfirmModal from '@components/ConfirmModal';
import Container from '@components/Container';
import StarRating from '@components/StarRating';
import GenresDropDown from '@components/GenresDropDown';
import FormField from '@components/FormField';
import ImageUpload from '@components/ImageUpload';
import Button from '@components/Button';

import { Movie } from '@/types/movie';

import styles from './MovieModal.module.scss';

interface MovieModalProps {
  isOpen: boolean;
  initialMovie?: Movie;
  onClose: () => void;
}

const MovieModal = ({ isOpen, initialMovie, onClose }: MovieModalProps) => {
  const {
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
    handleSubmit,
    handleDeleteMovie,
  } = useMovieModal({ initialMovie, onClose });
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleConfirmDelete = () => {
    setIsConfirmOpen(false);
    handleDeleteMovie();
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
  };

  const handleTrashClick = () => {
    setIsConfirmOpen(true);
  };

  const isEdit = Boolean(initialMovie);

  if (!isOpen) return null;

  return (
    <>
      {createPortal(
        <div className={styles.overlay} onClick={onClose}>
          <Container variant="modal">
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.headerModal}>
                <button className={styles.btnClose} onClick={onClose} aria-label="Закрыть" />
                <h2 className={styles.title}>{isEdit ? 'Edit movie' : 'Add Movie'}</h2>
              </div>
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.formGrid}>
                  <ImageUpload
                    value={srcImage.field}
                    error={srcImage.error}
                    onChange={(e) => srcImage.handleImageChange(e)}
                  />
                  <div className={styles.fieldsSection}>
                    <div className={styles.field}>
                      <StarRating value={rating} onChange={setRating} />
                    </div>
                    <div className={styles.row}>
                      <FormField
                        placeholder="title*"
                        value={title.field}
                        onChange={(e) => title.handleFieldChange(e)}
                        onBlur={title.handleFieldBlur}
                        onFocus={title.handleFieldFocus}
                        error={title.error}
                      />
                      <FormField
                        placeholder="director"
                        value={director.field}
                        onChange={(e) => director.handleFieldChange(e)}
                      />
                    </div>
                    <div className={styles.row}>
                      <div className={styles.field}>
                        <FormField
                          placeholder="year*"
                          type="text"
                          value={year.field}
                          maxLength={4}
                          onChange={(e) => year.handleFieldChange(e)}
                          onFocus={year.handleFieldFocus}
                          onBlur={year.handleFieldBlur}
                          error={year.error}
                        />
                      </div>
                      <div className={styles.field}>
                        <GenresDropDown
                          selected={selectedGenres}
                          onChange={(newGenres) => {
                            setSelectedGenres(newGenres);
                            if (newGenres.length === 3) setGenresError('');
                          }}
                          error={!!genresError}
                        />
                        {genresError && <div className={styles.errorMessage}>{genresError}</div>}
                      </div>
                    </div>
                    <FormField
                      placeholder="main actors*"
                      type="text"
                      value={actors.field}
                      onChange={(e) => actors.handleFieldChange(e)}
                      onFocus={actors.handleFieldFocus}
                      onBlur={actors.handleFieldBlur}
                      error={actors.error}
                    />
                    <FormField
                      variant="textarea"
                      placeholder="description"
                      type="text"
                      value={description.field}
                      onChange={(e) => description.handleFieldChange(e)}
                      rows={8}
                    />
                  </div>
                </div>
                {isEdit ? (
                  <div className={styles.wrapperBtn}>
                    <Button text=".done!." type="submit" ariaLabel="Отправить форму" />
                    <Button
                      variant="tertiary"
                      text=".trash!."
                      type="button"
                      onClick={handleTrashClick}
                      ariaLabel="Удалить"
                    />
                  </div>
                ) : (
                  <Button
                    text=".done!."
                    type="submit"
                    variant="secondary"
                    ariaLabel="Отправить форму"
                  />
                )}
              </form>
            </div>
          </Container>
        </div>,
        document.body
      )}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default MovieModal;
