import React from 'react';
import styled, { keyframes } from 'styled-components';
import Layout from '@/components/Layout';

const bounce = keyframes`
  10%{  transform: translateY(-35px); }
  15%{  transform: translateY(0px); }
  25%{  transform: translateY(-15px); }
  30%{  transform: translateY(0px); }
  50%{  transform: rotateZ(10deg); }
  60%{  transform: rotateZ(-10deg); }
  70%{  transform: rotateZ(10deg); }
  100%{ transform: rotateZ(0deg); }
`;

const movingShadow = keyframes`
  10%{  transform: scaleX(0.6); }
  15%{  transform: scaleX(1); }
  25%{  transform: scaleX(0.8); }
  30%{  transform: scaleX(1); }
  50%{  transform: translateX(6px); }
  60%{  transform: translateX(-6px); }
  70%{  transform: translateX(7px); }
  100%{ transform: translateX(-7px); }
`;

const Container = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  background: transparent;
  z-index: 9999;
`;

const PokeballWrapper = styled.div`
  height: 150px;
  width: 150px;
  position: relative;

  &::after {
    content: '';
    width: 90px;
    height: 10px;
    position: absolute;
    left: 30px;
    bottom: -5px;
    background-color: rgb(50, 10, 10);
    border-radius: 50%;
    animation: ${movingShadow} 2s ease-in-out infinite;
    z-index: -1;
  }
`;

const Pokeball = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  transform-origin: bottom center;
  animation: ${bounce} 2s ease-in-out infinite;
  border: 2px solid rgba(0, 0, 0, 0.7);
  overflow: hidden;
  border-radius: 50%;
  background: linear-gradient(
    180deg,
    rgba(244, 0, 31, 1) 0%,
    rgba(255, 0, 0, 1) 47.5%,
    rgba(0, 0, 0, 0.7) 47.5%,
    rgba(0, 0, 0, 0.7) 52.5%,
    white 52.5%,
    white 100%
  );

  &::after {
    content: '';
    width: 150px;
    height: 150px;
    position: absolute;
    top: -45px;
    left: -35px;
    border-radius: 50%;
    background: radial-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0) 50%
    );
  }

  &::before {
    content: '';
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.5);
    box-shadow: 2px 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 5px #fff,
      0 0 0 10px rgba(0, 0, 0, 0.7);
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
`;

const Loader = () => {
  return (
    <Layout title="Loading">
      <Container aria-label="Loading pokemon...">
        <PokeballWrapper>
          <Pokeball />
        </PokeballWrapper>
      </Container>
    </Layout>
  );
};

export default Loader;
