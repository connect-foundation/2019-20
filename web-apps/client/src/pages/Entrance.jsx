import React, {useContext} from 'react';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';
import GithubLogInButton from '../components/GithubLogInButton';
import SkipLogInButton from '../components/SkipLogInButton';
import Logo from '../components/Logo';
import {UserContext} from '../contexts/User';
import {isLoggedIn, isVisited} from '../utils/auth';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100vw;
  height: 80vh;
`;
const Entrance = () => {
  const {user} = useContext(UserContext);
  if (isLoggedIn(user) && isVisited(user)) {
    return <Redirect to='/service/main' />;
  }
  return (
    <Wrapper>
      <Logo />
      <GithubLogInButton />
      <SkipLogInButton />
    </Wrapper>
  );
};
export default Entrance;
