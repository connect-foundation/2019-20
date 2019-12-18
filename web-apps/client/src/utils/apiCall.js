import axios from 'axios';
import {
  imageHandleURI,
  productHandleURI,
  addUserURI,
  logOutURI,
} from '../assets/uris';

const deletePicture = async (mobileKey, deskTopKey) => {
  try {
    await axios.delete(imageHandleURI, {data: {key: mobileKey}});
    if (mobileKey !== deskTopKey) {
      await axios.delete(imageHandleURI, {data: {key: deskTopKey}});
    }
  } catch (err) {
    throw new Error(err);
  }
};

const uploadImages = async (formData) => {
  try {
    const response = await axios.post(imageHandleURI, formData);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

const uploadProduct = async (product) => {
  try {
    const {data} = await axios.post(productHandleURI, product);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const addUser = async ({latitude, longitude}) => {
  try {
    const options = {
      method: 'post',
      url: addUserURI,
      withCredentials: true,
      data: {latitude, longitude},
    };
    await axios(options);
  } catch (e) {
    throw new Error(e.response.status);
  }
};

const deleteJWTRequest = async () => {
  try {
    const options = {
      method: 'get',
      url: logOutURI,
      withCredentials: true,
    };
    await axios(options);
  } catch (e) {
    throw new Error(e);
  }
};

export {deletePicture, uploadImages, uploadProduct, addUser, deleteJWTRequest};
