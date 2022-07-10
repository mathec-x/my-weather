import Head from 'next/head'
import type { AppProps } from 'next/app'

import Theme from '@contexts/Theme';
import Pwa from '@contexts/Pwa';
import React from 'react';
import Grid from '@mui/material/Grid';

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>
      <Pwa>
        <Theme>
          <Grid container justifyContent="center">
            <Component {...pageProps} />
          </Grid>
        </Theme>
      </Pwa>
    </React.Fragment>
  )
}

export default App