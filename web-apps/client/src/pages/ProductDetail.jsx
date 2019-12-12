import React from 'react';
import ProductFooter from '../components/ProductFooter';
import styled from 'styled-components';
import ProductProfile from '../components/productProfile';
import SellerInfo from '../components/sellerInfo';
import ProductDescription from "../components/productDescription";
const Wrapper = styled.div`
  position: relative;
`;

const ProductDetail = () => {
  return (
    <Wrapper>
      <ProductProfile />
      <SellerInfo />
      <ProductDescription />
      <ProductFooter />
      {/*title ,userId, order, location, coordinates, areaRange*/}
      {/*price, pictures, contents, negotiable, hits, interests*/}
      {/*currentStatus, productStatus, deliverAvailable, category*/}
    </Wrapper>
  );
};

export default ProductDetail;
