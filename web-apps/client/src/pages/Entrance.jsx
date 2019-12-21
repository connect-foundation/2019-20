import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import GithubLogInButton from '../components/GithubLogInButton';
import SkipLogInButton from '../components/SkipLogInButton';
import Logo from '../components/Logo';
import { UserContext } from '../contexts/User';

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
  const { user } = useContext(UserContext);

  const isLogInned = () => {
    if (user && user.id && user.id.length > 0) {
      return true;
    }
    return false;
  };

  return (
    <Wrapper>
      <Logo />
      <GithubLogInButton />
      <SkipLogInButton />
      {isLogInned() && <Redirect to='/service/main' />}
    </Wrapper>
  );
};

export default Entrance;
