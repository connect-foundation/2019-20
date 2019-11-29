import axios from 'axios';

/**
 * 서버로부터 요청을 전달받기 위한 단순한 함수입니다.
 * 별다른 예외처리는 하지 않았습니다.
 * @param {*} keyword 
 * @param {*} from 
 * @param {*} size 
 */
const request = async (keyword, from, size) => {
  const uri = 'http://localhost:5000/products'; // test
  const skip = from * size;
  const requestUri = `${uri}?keyword=${keyword}&from=${skip}&limits=${size}`;
  try {
    const response = await axios.get(requestUri);
    return response;
  } catch (e) {
    return {};
  }
};

export default request;
