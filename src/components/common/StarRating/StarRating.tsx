import { useState } from 'react';
// @ts-expect-error swiper
import Rating from 'react-ratings-star';

import useWindowWidth from '@/hooks/useWindowWidth';

import { formatRating } from '@/utils/formatRating';

import styles from './StarRating.module.scss';

interface StarRatingProps {
  value: number | undefined;
  onChange: (rating: number) => void;
}

const StarRating = ({ value, onChange }: StarRatingProps) => {
  const [rating, setRating] = useState(value);

  const windowWidth = useWindowWidth();
  const starSize = windowWidth && windowWidth <= 768 ? 17 : 20;

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    onChange(newRating);
  };

  return (
    <div className={styles.block}>
      <div className={styles.blockStars}>
        <Rating
          value={rating}
          onRatingChange={handleRatingChange}
          max={10}
          size={starSize}
          fullColor="#FFB13C"
          emptyColor="#851843"
        />
      </div>
      <span className={styles.blockRating}>
        {formatRating(rating)}
        <img src="/images/hero/icons/star.svg" alt="Star" />
      </span>
    </div>
  );
};

export default StarRating;
