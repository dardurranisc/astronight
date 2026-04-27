import clsx from 'clsx';

import styles from './SectionTitle.module.scss';

interface SectionTitleProps {
  text: string;
  mobileLeft?: boolean;
}

const SectionTitle = ({ text, mobileLeft }: SectionTitleProps) => {
  return <h2 className={clsx(styles.heading, mobileLeft && styles.mobileLeft)}>{text}</h2>;
};

export default SectionTitle;
