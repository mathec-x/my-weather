import type { NextPage } from 'next'
import Head from 'next/head'
import Grid from '@mui/material/Grid'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="my weather app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container justifyContent="center">
        Home
      </Grid>
    </div>
  )
}

export default Home
