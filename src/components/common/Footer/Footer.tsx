import Container from '../Container';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.copyright}>
          <p>.all rights reserved.</p>
          <span>Copyright © 2025 SALT AND PEPPER</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
