import Axios from 'axios';
import { PRODUCT_API } from './config';

const URI = PRODUCT_API;

export const getCategoryList = async () => {
  try {
    const response = await Axios.get(`${URI}/info/category`);
    return response.data;
  } catch (err) {
    if (err.response) {
      throw Error(err.response.status);
    }
    throw Error(err.errno);
  }
};

export const getProductList = async (options) => {
  try {
    const query = Object.entries(options).reduce((str, cur) => {
      const [key, value] = cur;
      if (value !== undefined) {
        return str.concat(`${str.length > 1 ? '&' : ''}${key}=${value}`);
      }
      return str;
    }, '?');
    const requestUri = `${URI}/products${query}`;
    const response = await Axios.get(requestUri);
    const result = response.data.map(({ _id, _source }) => {
      return { id: _id, ..._source, title: `[${options.from}]${_source.title}`, order: Date.parse(_source.order) };
    });
    return result;
  } catch (err) {
    throw Error(err.response);
  }
};
