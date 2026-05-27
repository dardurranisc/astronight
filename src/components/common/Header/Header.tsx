import { useState, useRef, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import Container from '@components/Container';
import Menu from '@components/Menu';
import MenuModal from '@components/MenuModal/MenuModal';
import Gamburger from '@components/Gamburger';
import MovieModal from '@components/MovieModal/MovieModal';

import styles from './Header.module.scss';
import SearchModal from '../SearchModal';

interface HeaderProps {
  variant?: 'default' | 'transparent';
}

const Header = ({ variant = 'default' }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

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

  useEffect(() => {
    if (isMenuOpen || isSearchModalOpen) {
      document.body.classList.add('header-fixed');
    } else {
      document.body.classList.remove('header-fixed');
    }
  }, [isMenuOpen, isSearchModalOpen]);

  return (
    <header
      ref={headerRef}
      className={clsx(
        styles.header,
        (isMenuOpen || isSearchModalOpen) && styles.fixed,
        styles[variant]
      )}
    >
      <Container variant="secondary">
        <div className={styles.headerInner}>
          <Gamburger
            isOpen={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            ariaLabel="Открыть меню"
          />
          <MenuModal isMenuOpen={isMenuOpen} onClose={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu
              variant="mobile"
              onClickSearch={() => setIsSearchModalOpen(true)}
              isSearchModalOpen={isSearchModalOpen}
            />
          </MenuModal>
          <Link href="/" className={styles.logo}>
            <Image src="/images/logo/logo.svg" width={120} height={74} alt="AstroNight" />
          </Link>
          <Menu
            onClickSearch={() => setIsSearchModalOpen(true)}
            isSearchModalOpen={isSearchModalOpen}
          />
          <button
            className={styles.buttonAdd}
            onClick={() => setIsAddModalOpen(!isAddModalOpen)}
            aria-label="Добавить фильм"
          >
            add
          </button>
          <MovieModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(!isAddModalOpen)} />
          {isSearchModalOpen && <SearchModal onClose={() => setIsSearchModalOpen(false)} />}
        </div>
      </Container>
    </header>
  );
};

export default Header;
