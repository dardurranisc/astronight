import { ReactNode, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

import clsx from 'clsx';

import { useBreakpoints } from '@/hooks/useBreakpoints';

import Header from '@components/Header';
import Footer from '@components/Footer';

import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const is404 = router.pathname === '/404';

  const footerRef = useRef<HTMLDivElement>(null);
  const breakpoint = useBreakpoints();

  useEffect(() => {
    if (footerRef.current) {
      const height = footerRef.current.offsetHeight;
      document.documentElement.style.setProperty('--footer-height', `${height}px`);
    }
  }, [breakpoint]);

  return (
    <div className={styles.wrapper}>
      <Header variant={is404 ? 'transparent' : 'default'} />
      <main className={clsx(styles.main, is404 && styles.static)}>{children}</main>
      {!is404 && <Footer ref={footerRef} />}
    </div>
  );
};

export default Layout;
