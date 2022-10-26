import '../styles/index.scss';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';
import { AppContextProvider } from '../store/appContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SWRConfig
      value={{ fetcher: (url) => fetch(url).then((res) => res.json()) }}
    >
      <SessionProvider session={session}>
        <AppContextProvider>
          <Component {...pageProps} />
        </AppContextProvider>
      </SessionProvider>
    </SWRConfig>
  );
}

export default MyApp;
