import React, { useState, useEffect, useContext, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

import { debounce } from '../utils';

const Wrapper = styled.div`
  position: relative;
`;

const ProductDetail = ({ match }) => {
  const INTEREST_UPDATE_DELAY = 1000;
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

  const updateInterest = useCallback(debounce((updateList) => {
    axios.put(`${PRODUCT.PRODUCT_HANDLE}/${productID}`, { interests: updateList });
  }, INTEREST_UPDATE_DELAY), []);

  const clickHeart = (event, active) => {
    let updateList;
    if (active) {
      updateList = [...interest, user.id];
    }
    if (!active) {
      updateList = interest.filter((id) => id !== user.id);
    }
    setInterest(updateList);
    updateInterest(updateList);
  }

  const heartStatus = (user) ? interest.includes(user.id) : false;

  useFetch(PRODUCT.getProdutDetialUri(productID), seDetail, productInfoLoadError);

  const images = selectImages(product);

  return (
    <Wrapper>
      <ProductProfile images={images} />
      <SellerInfo seller={seller} location={product && product.location} />
      <ProductDescription description={description} interest={interest} />
      <ProductFooter
        data={footerData}
        heartStatus={heartStatus}
        clickHeart={clickHeart}
      />
    </Wrapper>
  );
};

export default ProductDetail;
