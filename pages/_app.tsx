import Head from 'next/head'
import Theme from '@contexts/Theme';
import Pwa from '@contexts/Pwa';
import React from 'react';
import Grid from '@mui/material/Grid';
import '@styles/globals.css'

import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>
      <Theme>
        <Pwa>
          <Grid container justifyContent="center">
            <Component {...pageProps} />
          </Grid>
        </Pwa>
      </Theme>
    </React.Fragment>
  )
}

export default App