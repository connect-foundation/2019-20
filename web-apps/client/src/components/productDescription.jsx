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
const ProductDescription = ({description, interest}) => {
  const {
    title,
    category,
    contents,
    hits,
    deliverAvailable,
    currentStatus,
    productStatus,
  } = description;

  const typeOfDeal = (deliverAvailable) => {
    if (deliverAvailable) {
      return <div>택버거래 가능</div>;
    } else {
      return <div>직거래만 가능</div>;
    }
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
      <div style={{marginTop: '1rem'}}>{contents}</div>
      <div style={{display: 'flex', marginTop: '1rem', color: '#444'}}>
        <div>조회: {hits} </div>
        <div style={{width: '1rem'}} />
        <div>관심: {interest}</div>
      </div>
    </Description>
  );
};

export default ProductDescription;
