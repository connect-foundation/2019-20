import React from 'react';
import styled from 'styled-components';

const PriceInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Price = styled.div`
  font-size: 1.2rem;
`;
const Negotiable = styled.div`
  color: #1a1;
`;
const Unnegotiable = styled.div`
  color: #a11;
`;
const PriceInformation = () => {
  const negotiable = false;
  const price = '5000원';

  return (
    <PriceInfo>
      <Price>{price}</Price>
      {negotiable && <Negotiable>가격제안 가능</Negotiable>}
      {!negotiable && <Unnegotiable>가격제안 불가능</Unnegotiable>}
    </PriceInfo>
  );
};

export default PriceInformation;
