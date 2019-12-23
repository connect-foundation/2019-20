import React from 'react';
import Carousel from './Carousel';
import HeaderInProduct from './headerInProduct';
import styled from 'styled-components';

const Header = styled.div`
  position: relative;
  height: 250px;
`;

const ProductProfile = ({images, id, seller}) => {
  return (
    <Header>
      <Carousel images={images} />
      <HeaderInProduct id={id} seller={seller}/>
    </Header>
  );
};

export default ProductProfile;
