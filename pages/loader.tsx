import React from 'react';
import Layout from '@/components/Layout';
import Loader, { LoaderContainer } from '../components/Loader';

const Temp = () => {
  return (
    <div>
      <Layout title="Loading">
        <LoaderContainer aria-label="Loading...">
          <Loader />
        </LoaderContainer>
      </Layout>
    </div>
  );
};

export default Temp;
