import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';

import { store } from '@/store';

import useStoreInitialization from '@/hooks/useStoreInitialization';

import Layout from '@/components/common/Layuot';

import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  useStoreInitialization();

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
