import React from 'react';
import logo from '../assets/oemarket.png';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 2rem;
  color: '#555';
`;
const OEMarket = styled.img`
  width: 5rem;
`;

const Logo = () => {
  return (
    <Wrapper>
      <OEMarket src={logo} />
    </Wrapper>
  );
};

export default Logo;
