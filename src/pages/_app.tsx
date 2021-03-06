import Head from 'next/head'
import '../../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>My Tasks</title>
        <meta name="description" content="Tasks management app, next.js project" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Component {...pageProps} />
    </>

  )
}

export default MyApp
