import Background from '@components/Background';
import Section from '@components/Section';
import Container from '@components/Container';
import AddSomething from '@components/AddSomething';

import styles from './AddSuggestion.module.scss';

const AddSuggestion = () => {
  return (
    <>
      <Section>
        <Background
          src="/images/addSuggestion/background.png"
          alt="background"
          fill
          opacity={0.2}
        />
        <Container>
          <div className={styles.main}>
            <AddSomething />
          </div>
        </Container>
      </Section>
    </>
  );
};

export default AddSuggestion;
