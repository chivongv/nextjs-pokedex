import React, { FC } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

const Container = styled('div')({
  background: 'linear-gradient(to right, #d4d3dd, #efefbb)',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 20,
  minHeight: '100vh',
});

const InnerContainer = styled('div')({
  maxWidth: 1200,
  margin: '0 auto',
});

const Footer = styled('footer')({
  textAlign: 'center',
  marginTop: 10,
  padding: '15px',
});

type Props = {
  title: string;
};

export const Layout: FC<Props> = ({ title, children }) => {
  return (
    <Container>
      <InnerContainer>
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>{children}</main>
        <Footer>
          © {new Date().getFullYear() + ' '}
          <a href="https://codepen.io/FlorinPop17/pen/gOYZxyE">
            Design inspiration by Florin Pop
          </a>
          , built with NextJS by{' '}
          <a
            href="https://chivongv.se/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chi Vong
          </a>
        </Footer>
      </InnerContainer>
    </Container>
  );
};
