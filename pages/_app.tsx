import '@root/global.scss';
import '../styles/globals.css';
import Head from 'next/head';
import * as React from 'react';

import Providers from '@components/Providers';

function MyApp({ Component, pageProps }) {
  return (
    <Providers>
      <Head>
        <title>Heidi & Kareem</title>
      </Head>
      <Component {...pageProps} />
    </Providers>
  );
}

export default MyApp;
