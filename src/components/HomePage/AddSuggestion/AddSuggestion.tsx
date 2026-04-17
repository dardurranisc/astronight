import Background from "@/components/common/Background";
import Section from "@/components/common/Section";
import Container from "@/components/common/Container";
import AddSomething from "@/components/common/AddSomething";

import styles from "./AddSuggestion.module.scss";


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
