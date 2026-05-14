import Background from '@components/Background';
import Section from '@components/Section';
import Container from '@components/Container/Container';
import SectionTitle from '@components/SectionTitle';

import { heading } from '@/constants/headingData';
import { paragraphsData } from './constants/paragraphsData';

import styles from './IntroSection.module.scss';

const IntroSection = () => {
  return (
    <Section>
      <Background
        alt="Background"
        src="/images/introSection/backgroundIntro.jpg"
        width={960}
        height={960}
        opacity={0.6}
      />
      <Container>
        <div className={styles.main}>
          <SectionTitle text={heading.intro} />
          <div className={styles.blockParagraphs}>
            {paragraphsData.map((p) => (
              <p key={p.id}>{p.text}</p>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default IntroSection;
