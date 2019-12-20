import React from 'react';
import githubButton from '../assets/github.png';
import styled from 'styled-components';
import {githubLoginURI} from '../assets/uris';

const GithubButton = styled.img`
  width: 12.2rem;
  height: 2.5rem;
`;
const GithubLogInButton = () => {
  return (
    <a
      href={githubLoginURI}
      style={{borderRadius: '1rem', background: 'white'}}
    >
      <GithubButton src={githubButton} />
    </a>
  );
};

export default GithubLogInButton;
