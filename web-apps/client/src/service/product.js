import axios from 'axios';

export const getBuyListById = async (user, from) => {
  try {
    const response = await axios.get('http://localhost:5000/products',
      {
        params: { buyer: user.id, from }
      });
    return response.data;
  } catch (e) {
    return [];
  }
};

export const getInterestProductById = async (user, from) => {
  try {
    const response = await axios.get('http://localhost:5000/products',
      {
        params: { interests: user.id, from }
      });
    return response.data;
  } catch (e) {
    return [];
  }
};
