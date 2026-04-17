import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";

import { addMovie } from "@/store/moviesSlice";

import Container from "../Container";
import StarRating from "../StarRating";
import GenresDropDown from "../GenresDropDown";
import FormField from "../FormField";
import ImageUpload from "../ImageUpload";
import Button from "../Button";

import useField from "@/hooks/useField";
import useImageUpload from "@/hooks/useImageUpload";

import validateForm from "@utils/validateForm";

import { Movie } from "@/types/movie";

import styles from "./AddMovieModal.module.scss";


interface AddMovieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMovieModal = ({ isOpen, onClose }: AddMovieModalProps) => {
  const title = useField("", validateForm);
  const director = useField("");
  const year = useField("", validateForm, (value) => value.replace(/\D/g, ""));
  const actors = useField("", validateForm, (value) => value.split("/").join(","));
  const description = useField("");
  const srcImage = useImageUpload("", validateForm);

  const [rating, setRating] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genresError, setGenresError] = useState("");

  const dispatch = useDispatch();

  const validateGenres = () => {
    const isValid = selectedGenres.length === 3;
    setGenresError(!isValid ? "you should complete this area" : "" )
    return isValid
  }

  const isFormValid = (): boolean => {
    [srcImage, title, year, actors].forEach(item => item.validate(item.field));
    const genresValid = validateGenres();
    
    return !title.error && !year.error && !actors.error && !srcImage.error && genresValid;
  };

  const resetForm = () => {
    [title, director, year, actors, description, srcImage].forEach(item => item.reset());
    setRating(0);
    setSelectedGenres([]);
    setGenresError("");
  }

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!isFormValid()) return;

    const newMovie: Movie = {
      id: Date.now(),
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

    dispatch(addMovie(newMovie));
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <Container variant="modal">
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.headerModal}>
            <button
              className={styles.btnClose}
              onClick={onClose}
              aria-label="Закрыть"
            />
            <h2 className={styles.title}>Add movie</h2>
          </div>
          <form className={styles.form} onSubmit={handleAdd} noValidate>
            <div className={styles.formGrid}>
              <ImageUpload
                value={srcImage.field}
                error={srcImage.error}
                onChange={(e) => srcImage.handleImageChange(e)}
              />
              <div className={styles.fieldsSection}>
                <div className={styles.field}>
                  <StarRating value={0} onChange={setRating} />
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
                        if (newGenres.length === 3) setGenresError("");
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
            <Button
              text=".done!."
              type="submit"
              variant="secondary"
              ariaLabel="Отправить форму"
            />
          </form>
        </div>
      </Container>
    </div>,
    document.body,
  );
};

export default AddMovieModal;
