import React from 'react';
import styled from 'styled-components';
import {takeDigitFromNumber} from '../utils/time';

const Description = styled.div`
  margin: 1rem;
  padding-bottom: 4rem;
`;
const SubInfo = styled.div`
  display: flex;
  margin: 0 0.2rem;
  justify-content: space-between;
  color: #555;
  font-size: 0.9rem;
`;
const Title = styled.h2``;
const ProductDescription = () => {
  const {
    title,
    category,
    order,
    contents,
    hits,
    interests,
    deliverAvailable,
    currentStatus,
    productStatus,
    price,
  } = {
    title: '해피해킹 Type-S',
    category: '디지털/가전',
    order: 1576177626292,
    contents: '사세요~',
    hits: 152,
    interests: 12,
    deliverAvailable: true,
    currentStatus: '대기',
    productStatus: '미사용',
    price: 2000000,
  };

  const typeOfDeal = (deliverAvailable) => {
    if (deliverAvailable) {
      return <div>택버거래 가능</div>;
    } else {
      return <div>직거래만 가능</div>;
    }
  };

  const parsePrice = (price) => {
    return `${takeDigitFromNumber(price)}원`;
  };

  return (
    <Description>
      <Title>{title}</Title>
      <SubInfo>
        {category} {typeOfDeal(deliverAvailable)}
      </SubInfo>
      <SubInfo>
        <div>제품 상태: {productStatus}</div>
        <div>거래 상태: {currentStatus}</div>
      </SubInfo>
      <div style={{margin: '0.5rem 0 1rem 0'}}>
        판매가 : {parsePrice(price)}
      </div>
      <div>{contents}</div>
      <div style={{display: 'flex', marginTop: '1rem', color: '#444'}}>
        <div>조회: {hits} </div>
        <div style={{width: '1rem'}} />
        <div>관심: {interests}</div>
      </div>
    </Description>
  );
};

export default ProductDescription;
