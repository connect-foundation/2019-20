import axios from 'axios';

import { PRODUCT } from '../assets/uris';

const fetch = async (uri, params) => {
  try {
    const response = await axios.get(uri, { params });
    return response.data;
  } catch (e) {
    return [];
  }
}

export const getBuyListById = async (user, from) => {
  return await fetch(PRODUCT.PRODUCT_BUY_LIST_MEMBER, { buyer: user.id, from });
};

export const getInterestProductById = async (user, from) => {
  return await fetch(PRODUCT.PRODUCT_INTEREST_LIST_MEMBER, { interest: user.id, from });
};
