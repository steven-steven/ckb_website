import Head from 'next/head'
import '../styles/globals.css'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Cipta Khasanah Blasting</title>
        <link rel="shortcut icon" href="/ckbLogo.ico" />
      </Head>
      <Script
         strategy="lazyOnload"
         src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
       />
       <Script id="gtag" strategy="lazyOnload">
         {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
         `}
       </Script>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
