import React, {useState, useEffect, useContext, useCallback} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import {useHistory} from 'react-router-dom';

import ProductFooter from '../components/ProductFooter';
import ProductProfile from '../components/ProductProfile';
import SellerInfo from '../components/SellerInfo';
import ProductDescription from '../components/ProductDescription';

import useFetch from '../hooks/useFetch';

import {isMobile, debounce} from '../utils/index';
import filterObject from '../utils/object';
import {PRODUCT} from '../assets/uris';
import descriptionField from '../assets/productDescriptionField';
import msg from '../assets/errorMessages';

import {UserContext} from '../contexts/User';
import {AlertMessageContext} from '../contexts/AlertMessage';

const Wrapper = styled.div`
  position: relative;
`;

const ProductDetail = ({match}) => {
  const history = useHistory();
  const INTEREST_UPDATE_DELAY = 1000;
  const {user} = useContext(UserContext);
  const {dispatchMessage, ACTION_TYPE} = useContext(AlertMessageContext);
  const productID = match.params.id;

  const [detail, setDetail] = useState(null);
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState({});
  const [description, setDescription] = useState({});
  const [footerData, setFooterData] = useState({price: 0, negotiable: false});
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
    } else if (product === undefined) {
      alert(msg.productNotFound);
      history.replace('/service/main');
    }
  }, [history, product]);

  const productInfoLoadError = () => {
    dispatchMessage({
      type: ACTION_TYPE.ERROR,
      payload: msg.ProductDetailLoadFailError,
    });
  };

  const selectImages = (data) => {
    let result = [];
    if (data) {
      if (isMobile(navigator.userAgent)) {
        if (data.pictures.length) {
          result = data.pictures.map((pic) => pic.mobile);
        }
      } else if (data.pictures.length) {
        result = data.pictures.map((pic) => pic.deskTop);
      }
    }
    return result;
  };

  const updateInterest = useCallback(
    debounce((updateList) => {
      axios.put(`${PRODUCT.PRODUCT_HANDLE}/${productID}`, {
        interests: updateList,
      });
    }, INTEREST_UPDATE_DELAY),
    [],
  );

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
  };

  const heartStatus = user ? interest.includes(user.id) : false;

  useFetch(
    PRODUCT.getProdutDetialUri(productID),
    setDetail,
    productInfoLoadError,
  );

  const images = selectImages(product);

  return (
    <Wrapper>
      <ProductProfile images={images} id={productID} seller={product} />
      <SellerInfo seller={seller} location={product && product.location} />
      <ProductDescription description={description} interest={interest} />
      <ProductFooter
        data={footerData}
        heartStatus={heartStatus}
        clickHeart={clickHeart}
        seller={seller}
        product={product}
      />
    </Wrapper>
  );
};

export default ProductDetail;
