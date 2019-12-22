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

export const getBuyListById = async (id, from) => {
  const response = await getData(PRODUCT.PRODUCT_BUY_LIST_MEMBER, {
    buyer: id,
    from,
  });
  return response;
};

export const getInterestProductById = async (id, from) => {
  const response = await getData(PRODUCT.PRODUCT_INTEREST_LIST_MEMBER, {
    interest: id,
    from,
  });
  return response;
};

export const getCategoryList = async () => {
  try {
    const response = await axios.get(PRODUCT.CATEGORY_INFO);
    return response.data;
  } catch (err) {
    if (err.response) {
      throw Error(err.response.status);
    }
    throw Error(err.errno);
  }
};

const makeQuery = ({
  price: {start, end},
  categories,
  coordinates,
  distance,
  from,
  limits,
  keyword,
}) => {
  const queries = [];
  if (from) {
    queries.push(['from', from]);
  }
  if (limits) {
    queries.push(['limits', limits]);
  }
  if (categories && categories.length >= 1) {
    queries.push(['category', categories.join(',')]);
  }
  if (distance) {
    queries.push(['coordinates', coordinates]);
    queries.push(['distance', distance]);
  }
  if (end || start) {
    queries.push(['price', `${start}${end ? `,${end}` : ''}`]);
  }
  if (keyword.length) {
    queries.push(['keyword', keyword]);
  }
  const query = queries.map((q) => q.join('=')).join('&');
  return query;
};

export const getProductList = async (options) => {
  try {
    const query = makeQuery(options);
    const requestUri = `${PRODUCT.PRODUCT_LIST}?${query}`;
    const response = await axios({
      method: 'post',
      url: requestUri,
      withCredentials: true,
    });
    const result = response.data.map(({_id, _source, fields}) => {
      const data = {
        id: _id,
        ..._source,
        order: Date.parse(_source.order),
      };
      if (fields) {
        return {
          ...data,
          distance: +fields.distance,
        };
      }
      return data;
    });
    return result;
  } catch (err) {
    throw Error(err.response);
  }
};
