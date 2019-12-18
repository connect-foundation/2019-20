import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import ProductFooter from '../components/ProductFooter';
import ProductProfile from '../components/ProductProfile';
import SellerInfo from '../components/SellerInfo';
import ProductDescription from '../components/ProductDescription';

import useFetch from '../hooks/useFetch';

import {isMobile} from '../utils/index';
import objectFilter from '../utils/object';
import {productDetailAPI} from '../assets/uris';

const Wrapper = styled.div`
  position: relative;
`;

const ProductDetail = ({match}) => {
  const productID = match.params.id;

  const [detail, seDetail] = useState(null);
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [description, setDescription] = useState({});
  const [footerData, setFooterData] = useState({price: 0, negotiable: false});
  const [interest, setInterest] = useState(0);

  const descriptionField = [
    'title',
    'category',
    'contents',
    'hits',
    'deliverAvailable',
    'currentStatus',
    'productStatus',
  ];

  useEffect(() => {
    if (detail !== null) {
      setProduct(detail.product);
      setSeller(detail.seller);
    }
  }, [detail]);

  useEffect(() => {
    if (product !== null) {
      const filtered = objectFilter(product, descriptionField);
      setDescription(filtered);
      setInterest(product.interests);
      const footer = objectFilter(product, ['price', 'negotiable']);
      setFooterData(footer);
    }
  }, [product]);

  const productInfoLoadError = () => {
    alert('상품 정보 로드 실패');
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
    setInterest(interest + 1);
  };
  const minusInterest = () => {
    setInterest(interest - 1);
  };

  useFetch(productDetailAPI(productID), seDetail, productInfoLoadError);

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
