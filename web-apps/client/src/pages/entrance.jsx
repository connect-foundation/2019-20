import React from 'react';
import styled from 'styled-components';
import NaverLogInButton from '../components/naverLogInButton';
import SkipLogInButton from '../components/skipLogInButton';
import Logo from '../components/logo';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vmin;
  @media all and (orientation: portrait) {
    height: 100vmax;
  }
`;
const Entrance = () => {
  return (
    <Wrapper>
      <Logo />
      <NaverLogInButton />
      <SkipLogInButton />
    </Wrapper>
  );
};

export default Entrance;
