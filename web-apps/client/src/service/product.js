import axios from 'axios';

import {PRODUCT} from '../assets/uris';

const getData = async (uri, params) => {
  try {
    const response = await axios.get(uri, {params});
    return response.data;
  } catch (e) {
    return [];
  }
};

export const getBuyListById = async (user, from) => {
  const response = await getData(PRODUCT.PRODUCT_BUY_LIST_MEMBER, {
    buyer: user.id,
    from,
  });
  return response;
};

export const getInterestProductById = async (user, from) => {
  const response = await getData(PRODUCT.PRODUCT_INTEREST_LIST_MEMBER, {
    interest: user.id,
    from,
  });
  return response;
};
