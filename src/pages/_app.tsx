import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';

import { store } from '@/store';

import AppInitializer from '@/components/common/AppInitializer';

import Layout from '@components/Layuot';

import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppInitializer>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppInitializer>
    </Provider>
  );
}
