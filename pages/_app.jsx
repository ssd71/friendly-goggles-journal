import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
// import '../styles/index.css';
// import '../styles/authform.css';
// import '../styles/dashboard.css';
// import '../styles/postform.css';

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //   return { ...appProps };
  // }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Component {...pageProps} />
        <style jsx global>
          {`
            body {
              font-family: 'Montserrat', sans-serif;
              background-color: black;
              align-text: center;
            }
          `}
        </style>
      </Container>
    );
  }
}

export default MyApp;
