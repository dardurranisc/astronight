import clsx from 'clsx';

import Background from '@components/Background';
import Section from '@components/Section';
import Container from '@components/Container';

import { aboutData } from './constants/aboutData';

import styles from './About.module.scss';

const About = () => {
  return (
    <>
      <Background src="/images/about/background.png" alt="space" fill priority />
      <Section>
        <Container variant="secondary">
          <div className={styles.block}>
            <div className={styles.heading}>
              <h1>Astro</h1>
            </div>
            <div className={styles.information}>
              <div className={styles.informationLists}>
                {aboutData.map((row, rowIndex) => (
                  <div key={rowIndex} className={styles.row}>
                    {row.map(({ title, text, align }) => (
                      <div key={title} className={clsx(styles.list, styles[align])}>
                        <h3 className={styles.title}>{title}</h3>
                        <p className={styles.text}>{text}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default About;
