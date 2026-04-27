import { useState, useRef, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import Container from '../Container';
import Menu from '../Menu';
import MenuModal from '../MenuModal/MenuModal';
import Gamburger from '../Gamburger';
import MovieModal from '../MovieModal/MovieModal';

import styles from './Header.module.scss';

interface HeaderProps {
  variant?: 'default' | 'transparent';
}

const Header = ({ variant = 'default' }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      const updateHeight = () => {
        const height = headerRef.current?.offsetHeight || 0;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      };

      updateHeight();

      const resizeObserver = new ResizeObserver(() => updateHeight());
      resizeObserver.observe(headerRef.current);

      return () => resizeObserver.disconnect();
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className={clsx(styles.header, isMenuOpen && styles.fixed, styles[variant])}
    >
      <Container variant="secondary">
        <div className={styles.headerInner}>
          <Gamburger
            isOpen={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            ariaLabel="Открыть меню"
          />
          <MenuModal isMenuOpen={isMenuOpen} onClose={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu variant="mobile" />
          </MenuModal>
          <Link href="/" className={styles.logo}>
            <Image src="/images/logo/logo.svg" width={120} height={74} alt="AstroNight" />
          </Link>
          <Menu />
          <button
            className={styles.buttonAdd}
            onClick={() => setIsAddModalOpen(!isAddModalOpen)}
            aria-label="Добавить фильм"
          >
            add
          </button>
          <MovieModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(!isAddModalOpen)} />
        </div>
      </Container>
    </header>
  );
};

export default Header;
