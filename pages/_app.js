import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Cipta Khasanah Blasting</title>
        <link rel="shortcut icon" href="/ckbLogo.ico" />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
