import Link from 'next/link';
import { useRouter } from 'next/router';

import clsx from 'clsx';

import { menuData } from './constants/menuData';

import styles from './Menu.module.scss';

interface MenuProps {
  isSearchModalOpen: boolean;
  variant?: 'desktop' | 'mobile';
  onClickSearch?: () => void;
}

const Menu = ({ isSearchModalOpen, variant = 'desktop', onClickSearch }: MenuProps) => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <>
      <nav
        className={clsx(styles.nav, variant === 'mobile' && styles.mobileNav)}
        aria-label="Главное меню"
      >
        <div className={clsx(styles.menu, styles[`${variant}Menu`])}>
          {menuData.map((link) => {
            const isModal = link.type === 'modal';
            const isActive = isModal
              ? isSearchModalOpen
              : !isSearchModalOpen && pathname === link.href;
            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  if (isModal) {
                    e.preventDefault();
                    onClickSearch?.();
                  }
                }}
                onMouseDown={(e) => {
                  if (isModal) {
                    e.stopPropagation();
                  }
                }}
                className={clsx(styles.menuItem, isActive && styles.currentActive)}
              >
                {link.text}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Menu;
