import axios from 'axios';

const deletePicture = async (mobileKey, deskTopKey) => {
  const url = 'http://localhost:5000/products/picture';
  await axios.delete(url, {data: {key: mobileKey}});
  if (mobileKey !== deskTopKey) {
    await axios.delete(url, {data: {key: deskTopKey}});
  }
};

const uploadImages = async (formData) => {
  const url = 'http://localhost:5000/products/picture';
  const response = await axios.post(url, formData);
  return response;
};

export {deletePicture, uploadImages};
