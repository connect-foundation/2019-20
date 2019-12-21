import axios from 'axios';

export const KAKAO_API = '0e7e14bdabdac7f7f61b7093185b8996';
export const KAKAO_REST_API = '19ba61889f7c185494c1f59dfb004993';

export const findAddressByCoordinates = async (lat, lon) => {
  const uri = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lat}&y=${lon}`;
  try {
    const response = await axios.get(uri, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_REST_API}`,
      }
    });
    const { data: { documents } } = response;
    return documents[0].address.address_name;
  } catch (e) {
    throw Error(e);
  }
};