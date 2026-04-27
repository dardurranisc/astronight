import { ReactNode } from 'react';
import { useRouter } from 'next/router';

import clsx from 'clsx';

import Header from '../Header';
import Footer from '../Footer';

import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const is404 = router.pathname === '/404';

  return (
    <>
      <Header variant={is404 ? 'transparent' : 'default'} />
      <main className={clsx(styles.main, is404 && styles.static)}>{children}</main>
      {!is404 && <Footer />}
    </>
  );
};

export default Layout;
