import React, {useState, useEffect, useContext, useCallback} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import {useHistory} from 'react-router-dom';

import ProductFooter from '../components/ProductFooter';
import ProductProfile from '../components/ProductProfile';
import SellerInfo from '../components/SellerInfo';
import ProductDescription from '../components/ProductDescription';

import useCredentialFetch from '../hooks/useCredentialFetch';

import {isMobile,debounce} from '../utils/index';
import filterObject from '../utils/object';
import {PRODUCT,ROUTES} from '../assets/uris';
import descriptionField from '../assets/productDescriptionField';
import msg from '../assets/errorMessages';

import {UserContext} from '../contexts/User';
import {AlertMessageContext} from '../contexts/AlertMessage';

import {isLoggedIn} from '../utils/auth';


const Wrapper = styled.div`
  position: relative;
`;

const ProductDetail = ({match}) => {
  const history = useHistory();
  const INTEREST_UPDATE_DELAY = 500;
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
      history.replace(ROUTES.MAIN);
    }
  }, [history, product]);

  const productInfoLoadError = useCallback(() => {
    dispatchMessage({
      type: ACTION_TYPE.ERROR,
      payload: msg.ProductDetailLoadFailError,
    });
  },[ACTION_TYPE.ERROR, dispatchMessage]);

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
    debounce(async (updateList) => {
      const options = {
        method: 'put',
        url: `${PRODUCT.PRODUCT_HANDLE}/${productID}`,
        withCredentials: true,
        data: {
          interests: updateList,  
        }
      };
      await axios(options);
    }, INTEREST_UPDATE_DELAY),
    [],
  );

  const clickHeart = (event, active) => {
    let updateList;
    if(!isLoggedIn(user)) {
      dispatchMessage({type:ACTION_TYPE.ERROR, payload: '로그인한 사용자만 가능합니다.'})
      return;
    }
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

  useCredentialFetch(
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
      />
    </Wrapper>
  );
};

export default ProductDetail;
