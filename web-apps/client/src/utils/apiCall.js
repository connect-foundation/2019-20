import axios from 'axios';
import {imageHandleURI, productHandleURI} from '../assets/uris';

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
    const response = await axios.post(productHandleURI, product);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export {deletePicture, uploadImages, uploadProduct};