import axios from 'axios';

const deletePicture = async (mobileKey, deskTopKey) => {
  try {
    const url = 'http://localhost:5000/products/picture';
    await axios.delete(url, {data: {key: mobileKey}});
    if (mobileKey !== deskTopKey) {
      await axios.delete(url, {data: {key: deskTopKey}});
    }
  } catch (err) {
    throw new Error(err);
  }
};

const uploadImages = async (formData) => {
  try {
    const url = 'http://localhost:5000/products/picture';
    const response = await axios.post(url, formData);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

const uploadProduct = async (product) => {
  try {
    const url = 'http://localhost:5000/products';
    const response = await axios.post(url, product);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export {deletePicture, uploadImages, uploadProduct};
