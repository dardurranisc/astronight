import Image, { ImageProps } from 'next/image';

import clsx from 'clsx';

import styles from './Background.module.scss';

interface BackgroundProps extends Pick<ImageProps, 'fill' | 'priority'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  opacity?: number;
  fixed?: boolean;
}

const Background = ({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  opacity = 1,
  fixed,
}: BackgroundProps) => {
  return (
    <div className={clsx(styles.background, fixed && styles.fixed)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        style={{ opacity }}
      />
    </div>
  );
};

export default Background;
