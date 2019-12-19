import React from 'react';
import styled from 'styled-components';

import {takeDigitFromNumber} from '../utils/time';

const PriceInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Price = styled.div`
  font-size: 1.1rem;
`;
const Negotiable = styled.div`
  color: #1a1;
`;
const Unnegotiable = styled.div`
  color: #a11;
`;
const PriceInformation = ({data: {price, negotiable}}) => {
  const parsePrice = (price) => {
    return `${takeDigitFromNumber(price)} 원`;
  };
  const value = parsePrice(price);

  return (
    <PriceInfo>
      <Price>{value}</Price>
      {negotiable && <Negotiable>가격제안 가능</Negotiable>}
      {!negotiable && <Unnegotiable>가격제안 불가능</Unnegotiable>}
    </PriceInfo>
  );
};

export default PriceInformation;
