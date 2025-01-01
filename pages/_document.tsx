import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Basic Meta Tags */}
          <meta name="title" content="Heidi & Kareem" />
          <meta name="description" content="Join us in celebrating our special weekend with the rest of our loved ones on the weekend of September 25th 2025. RSVP on our website." />
          <meta httpEquiv="content-language" content="en-us" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://heidiandkareem.com" />
          <meta property="og:title" content="Heidi & Kareem" />
          <meta property="og:description" content="Join us in celebrating our special weekend with the rest of our loved ones on the weekend of September 25th 2025. RSVP on our website." />
          <meta property="og:image" content="https://heidiandkareem.com/share.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:site_name" content="Heidi & Kareem" />

          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://heidiandkareem.com" />
          <meta property="twitter:title" content="Heidi & Kareem" />
          <meta property="twitter:description" content="Join us in celebrating our special weekend with the rest of our loved ones on the weekend of September 25th 2025. RSVP on our website." />
          <meta property="twitter:image" content="https://heidiandkareem.com/share.jpg" />

          {/* Apple/iMessage */}
          <link rel="apple-touch-icon" href="/share.jpg" />
          <link rel="apple-touch-icon-precomposed" href="/share.jpg" />

          {/* Favicons */}
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body className="theme-light">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
