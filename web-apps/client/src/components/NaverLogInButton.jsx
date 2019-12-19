import React from 'react';
import naverButton from '../assets/naverLogIn.png';
import styled from 'styled-components';
import { AUTH } from '../assets/uris';

const NaverButton = styled.img`
  width: 12rem;
`;
const NaverLogInButton = () => {
  return (
    <a href={AUTH.NAVER_LOGIN}>
      <NaverButton src={naverButton} />
    </a>
  );
};

export default NaverLogInButton;
