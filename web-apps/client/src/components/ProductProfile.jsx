import React from 'react';
import Carousel from './Carousel';
import HeaderInProduct from './headerInProduct';
import styled from 'styled-components';

const Header = styled.div`
  position: relative;
  height: 250px;
`;

const ProductProfile = ({images}) => {
  return (
    <Header>
      <Carousel images={images} />
      <HeaderInProduct />
    </Header>
  );
};

export default ProductProfile;