import { AppContextProvider } from '@/store/appContext';
import '@/styles/index.scss';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import Router from 'next/router';
import NProgress from 'nprogress';
import '@/styles/nprogress.scss';
import Head from 'next/head';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>Obeyeyie Medical Center</title>
      </Head>
      <SWRConfig
        value={{ fetcher: (url) => fetch(url).then((res) => res.json()) }}
      >
        <SessionProvider session={session}>
          <AppContextProvider>
            <Component {...pageProps} />
          </AppContextProvider>
        </SessionProvider>
      </SWRConfig>
    </>
  );
}

export default MyApp;
