import axios from 'axios';
import getSellerInfoURI from '../assets/uri';

const getSellerInfo = async (id) => {
  const uri = getSellerInfoURI(id);
  try {
    const { data } = await axios.get(uri);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export default getSellerInfo;
