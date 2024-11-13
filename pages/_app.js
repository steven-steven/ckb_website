import Head from 'next/head'
import '../styles/globals.css'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Cipta Khasanah Blasting</title>
        <link rel="shortcut icon" href="/ckbLogo.ico" />
        <meta name="description" content="Cipta Khasanah Blasting - Indonesia's top sandblasting company" />
        <meta name="keywords" content="sandblasting, coating, company, contractor" />
        {/* Open Graph Meta Tags */}
        <meta property="og:url" content="https://ckb.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cipta Khasanah Blasting" />
        <meta property="og:description" content="Cipta Khasanah Blasting - Indonesia's top sandblasting company" />
        <meta property="og:image" content="https://ckb.vercel.app/img/redpipe.png" />
        <meta property="og:image:alt" content="Cipta Khasanah Blasting" />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cipta Khasanah Blasting" />
        <meta name="twitter:description" content="Cipta Khasanah Blasting - Indonesia's top sandblasting company" />
        <meta name="twitter:image" content="https://ckb.vercel.app/img/redpipe.png" />
        <meta name="twitter:image:alt" content="Cipta Khasanah Blasting" />
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
