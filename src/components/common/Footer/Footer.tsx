import clsx from 'clsx';

import Container from '../Container';

import styles from './Footer.module.scss';

interface FooterProps {
  isGlobal?: boolean;
}

const Footer = ({ isGlobal = true }: FooterProps) => {
  return (
    <footer className={clsx(styles.footer, isGlobal && 'globalFooter')}>
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
