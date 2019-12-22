import axios from 'axios';
import {PRODUCT, AUTH} from '../assets/uris';

export const deletePicture = async (mobileKey, deskTopKey) => {
  try {
    await axios.delete(PRODUCT.IMAGE_HANDLE, {data: {key: mobileKey}});
    if (mobileKey !== deskTopKey) {
      await axios.delete(PRODUCT.IMAGE_HANDLE, {data: {key: deskTopKey}});
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const uploadImages = async (formData) => {
  try {
    const response = await axios.post(PRODUCT.IMAGE_HANDLE, formData);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export const uploadProduct = async (product) => {
  try {
    const {data} = await axios.post(PRODUCT.PRODUCT_HANDLE, product);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const addUser = async ({latitude, longitude}) => {
  try {
    const options = {
      method: 'post',
      url: AUTH.ADD_USER,
      withCredentials: true,
      data: {latitude, longitude},
    };
    const {data} = await axios(options);
    return data;
  } catch (e) {
    throw new Error(e.response.status);
  }
};

export const deleteJWTRequest = async () => {
  try {
    const options = {
      method: 'get',
      url: AUTH.LOGOUT,
      withCredentials: true,
    };
    await axios(options);
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteUser = async () => {
  try {
    const options = {
      method: 'delete',
      url: AUTH.WITHDRAWAL,
      withCredentials: true,
    };
    await axios(options);
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteProduct = async (id, userId) => {
  try {
    const options = {
      method: 'delete',
      url: PRODUCT.deleteProductURI(id),
      data: {userId},
    };
    await axios(options);
  } catch (e) {
    throw new Error(e);
  }
};
