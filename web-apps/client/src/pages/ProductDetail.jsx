import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import ProductFooter from '../components/ProductFooter';
import ProductProfile from '../components/ProductProfile';
import SellerInfo from '../components/SellerInfo';
import ProductDescription from '../components/ProductDescription';

import useFetch from '../hooks/useFetch';

import { isMobile } from '../utils/index';
import filterObject from '../utils/object';
import { PRODUCT } from '../assets/uris';
import descriptionField from '../assets/productDescriptionField';
import msg from '../assets/errorMessages';

import { UserContext } from '../contexts/User';
import { AlertMessageContext } from '../contexts/AlertMessage';

const Wrapper = styled.div`
  position: relative;
`;

const ProductDetail = ({ match }) => {
  console.log('sdf');
  const { user } = useContext(UserContext);
  const { dispatchMessage, ACTION_TYPE } = useContext(AlertMessageContext);
  const productID = match.params.id;

  const [detail, seDetail] = useState(null);
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState({});
  const [description, setDescription] = useState({});
  const [footerData, setFooterData] = useState({ price: 0, negotiable: false });
  const [interest, setInterest] = useState([]);

  useEffect(() => {
    if (detail !== null) {
      setProduct(detail.product);
      setSeller(detail.seller);
    }
  }, [detail]);

  useEffect(() => {
    if (product) {
      const filtered = filterObject(product, descriptionField);
      setDescription(filtered);
      setInterest(product.interests);
      const footer = filterObject(product, ['price', 'negotiable']);
      setFooterData(footer);
    }
  }, [product]);

  const productInfoLoadError = () => {
    dispatchMessage({
      type: ACTION_TYPE.ERROR,
      payload: msg.ProductDetailLoadFailError,
    });
  };

  const selectImages = (data) => {
    let result = [];
    if (data !== null) {
      if (isMobile(navigator.userAgent)) {
        if (data.pictures.length) {
          result = data.pictures.map((pic) => pic.mobile);
        }
      } else {
        if (data.pictures.length) {
          result = data.pictures.map((pic) => pic.deskTop);
        }
      }
    }
    return result;
  };

  const addInterest = () => {
    setInterest([...interest, user.id]);
  };
  const minusInterest = () => {
    const result = [...interest].slice(0, -1);
    setInterest(result);
  };

  useFetch(PRODUCT.getProdutDetialUri(productID), seDetail, productInfoLoadError);

  const images = selectImages(product);

  return (
    <Wrapper>
      <ProductProfile images={images} />
      <SellerInfo seller={seller} location={product && product.location} />
      <ProductDescription description={description} interest={interest} />
      <ProductFooter
        data={footerData}
        addInterest={addInterest}
        minusInterest={minusInterest}
      />
    </Wrapper>
  );
};

export default ProductDetail;
