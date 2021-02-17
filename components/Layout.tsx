import React, { FC } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import GithubCorner from 'react-github-corner';

const Container = styled('div')({
  background: 'linear-gradient(to right, #d4d3dd, #efefbb)',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 20,
  minHeight: '100vh',
  position: 'relative',
  paddingBottom: 10,
});

const ContentWrapper = styled.div({
  maxWidth: 1200,
  margin: '0 auto',
  paddingBottom: '2.5rem',
});

const PageHeader = styled('a')({
  display: 'inline-block',
  width: '100%',
  fontSize: '2rem',
  textAlign: 'center',
  margin: '0.5rem 0',
});

const Footer = styled('footer')({
  textAlign: 'center',
  padding: '0 15px',
  position: 'absolute',
  bottom: 0,
  width: '100%',
  paddingBottom: 10,
});

type Props = {
  title: string;
};

const Layout: FC<Props> = ({ title, children }) => {
  return (
    <Container>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentWrapper>
        <GithubCorner
          href="https://github.com/chivongv/nextjs-pokedex"
          bannerColor="#b7a98e"
          octoColor="rgba(255, 255, 255, 0.6)"
        />
        <Link href="/" passHref>
          <PageHeader>NextJS Pokedex</PageHeader>
        </Link>
        <main>{children}</main>
      </ContentWrapper>
      <Footer>
        © {new Date().getFullYear() + ' '}
        Built with NextJS by{' '}
        <a
          href="https://chivongv.se/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chi Vong
        </a>
      </Footer>
    </Container>
  );
};

export default Layout;
