import React from 'react';
import naverButton from '../assets/naverLogIn.png';
import styled from 'styled-components';
import {naverLoginURI} from '../assets/uris';

const NaverButton = styled.img`
  width: 10rem;
`;
const NaverLogInButton = () => {
  return (
    <a href={naverLoginURI}>
      <NaverButton src={naverButton} />
    </a>
  );
};

export default NaverLogInButton;
