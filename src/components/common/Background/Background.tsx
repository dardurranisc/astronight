import Image, { ImageProps } from 'next/image';

import clsx from 'clsx';

import styles from './Background.module.scss';

interface BackgroundProps extends Pick<ImageProps, 'fill' | 'priority'> {
  variant?: 'default' | 'fixed' | 'dynamic';
  src: string;
  alt: string;
  width?: number;
  height?: number;
  opacity?: number;
}

const Background = ({
  variant = 'default',
  src,
  alt,
  width,
  height,
  fill,
  priority,
  opacity = 1,
}: BackgroundProps) => {
  return (
    <div className={clsx(styles.background, styles[variant])}>
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
