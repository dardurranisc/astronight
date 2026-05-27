import clsx from 'clsx';

import Container from '../Container';

import styles from './Footer.module.scss';

interface FooterProps {
  ref?: React.Ref<HTMLElement>;
}

const Footer = ({ ref }: FooterProps) => {
  return (
    <footer ref={ref} className={clsx(styles.footer)}>
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
