import axios from 'axios';
import {getSellerInfoURI} from '../assets/uri';

const getSellerInfo = async (id) => {
  try {
    const uri = getSellerInfoURI(id);
    const { data } = await axios.get(uri);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export default getSellerInfo;
