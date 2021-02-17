import Router from 'next/router';
import { useEffect, useState } from 'react';
import '@/styles/global.css';
import Loader from '@/components/Loader';

const MyApp = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return function cleanup() {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return <>{loading ? <Loader /> : <Component {...pageProps} />}</>;
};

export default MyApp;
