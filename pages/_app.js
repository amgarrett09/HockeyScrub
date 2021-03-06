import React from 'react';
import App, { Container } from 'next/app';
import { PageTransition } from 'next-page-transitions';
import Layout from '../components/Layout';
import LoadingContext from '../context/LoadingContext';
import 'bulma/css/bulma.min.css';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  // State for react context
  state = {
    loading: false,
  };

  setLoading = () => {
    this.setState({
      loading: true,
    });
  };

  unsetLoading = () => {
    this.setState({
      loading: false,
    });
  };

  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <Container>
        <LoadingContext.Provider
          value={{
            loading: this.state.loading,
            setLoading: this.setLoading,
            unsetLoading: this.unsetLoading,
          }}
        >
          <Layout>
            <PageTransition
              timeout={200}
              classNames="page-transition"
              skipInitialTransition
            >
              <Component {...pageProps} key={router.route} />
            </PageTransition>
          </Layout>
          <style jsx global>
            {`
              .page-transition-enter {
                opacity: 0;
                transform: translateY(-20px);
              }
              .page-transition-enter-active {
                opacity: 1;
                transform: translateY(0px);
                transition: opacity 200ms, transform 200ms;
              }
              .page-transition-exit {
                opacity: 1;
              }
              .page-transition-exit-active {
                opacity: 0;
                transition: opacity 200ms;
              }

              .box {
                overflow: auto
              }
            `}
          </style>
        </LoadingContext.Provider>
      </Container>
    );
  }
}

export default MyApp;
