import { ReactNode } from 'react';

import styles from './Section.module.scss';

interface SectionProps {
  children: ReactNode;
}

const Section = ({ children }: SectionProps) => {
  return <section className={styles.section}>{children}</section>;
};

export default Section;
