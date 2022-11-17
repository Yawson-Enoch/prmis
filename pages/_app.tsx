import { AppContextProvider } from '@/store/appContext';
import '@/styles/index.scss';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

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
