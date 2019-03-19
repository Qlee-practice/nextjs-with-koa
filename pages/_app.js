import React from 'react'
import App, { Container } from 'next/app'
import Head from './layout/head';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <div>
        <Head/>
        <Container>
          <Component { ...pageProps } />
        </Container>
      </div>

    )
  }
}

export default MyApp