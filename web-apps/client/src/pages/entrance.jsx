import React, {useEffect, useContext} from 'react';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';
import NaverLogInButton from '../components/naverLogInButton';
import SkipLogInButton from '../components/skipLogInButton';
import Logo from '../components/logo';
import {UserContext} from '../contexts/user';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vmin;
  width: 100vmax;
  @media all and (orientation: portrait) {
    height: 100vmax;
    width: 100vmin;
  }
`;
const Entrance = () => {
  const {user} = useContext(UserContext);

  const isLogInned = () => {
    return !!(user && user.id && user.id >= 0);
  };
  return (
    <Wrapper>
      <Logo />
      <NaverLogInButton />
      <SkipLogInButton />
      {isLogInned() && <Redirect to='/service/main' />}
    </Wrapper>
  );
};

export default Entrance;
