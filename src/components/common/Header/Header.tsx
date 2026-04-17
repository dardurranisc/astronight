import { useState, useRef, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import clsx from "clsx";

import Container from "../Container";
import Menu from "../Menu";
import MenuModal from "../MenuModal/MenuModal";
import Gamburger from "../Gamburger";
import AddMovieModal from "../AddMovieModal/AddMovieModal";

import styles from "./Header.module.scss";

interface HeaderProps {
  variant?:"default" | "transparent"
}

const Header = ({
  variant = "default"
}:HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      const headerCurrent = headerRef.current;
      setHeaderHeight(() => headerCurrent.offsetHeight);
    }
  }, [isMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={clsx(styles.header , isMenuOpen && styles.fixed , styles[variant])}
    >
      <Container variant="secondary">
        <div className={styles.headerInner}>
          <Gamburger
            isOpen={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            ariaLabel="Открыть меню" 
          />
          <MenuModal
            isMenuOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(!isMenuOpen)}
            topFromHeader={headerHeight}
          >
            <Menu variant="mobile" />
          </MenuModal>
          <Link href="/" className={styles.logo}>
            <Image
              src="/images/logo/logo.svg"
              width={120}
              height={74}
              alt="AstroNight"
            />
          </Link>
          <Menu />
          <button
            className={styles.buttonAdd}
            onClick={() => setIsAddModalOpen(!isAddModalOpen)}
            aria-label="Добавить фильм"
          >
            add
          </button>
          <AddMovieModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(!isAddModalOpen)}
          />
        </div>
      </Container>
    </header>
  );
};

export default Header;
