import { Movie } from '@/types/movie';

import clsx from 'clsx';

import { formatRating } from '@/utils/formatRating';

import styles from './MoviePreviewCard.module.scss';

interface MoviePreviewCardProps extends Omit<Movie, 'id'> {
  variant?: 'default' | 'medium';
}

const MoviePreviewCard = ({
  title,
  src,
  alt,
  rating,
  year,
  variant = 'default',
}: MoviePreviewCardProps) => {
  return (
    <div className={clsx(styles.card, styles[`${variant}Card`])}>
      <div className={styles.wrapper}>
        <img className={styles.cardImage} src={src} alt={alt} />
        <span className={styles.cardRating}>
          <img className={styles.star} src="/images/hero/icons/star.svg" alt="Star" />
          {formatRating(rating)}
        </span>
      </div>
      <h3 className={styles.cardName}>{title}</h3>
      <p className={styles.cardYear}>{year}</p>
    </div>
  );
};

export default MoviePreviewCard;
