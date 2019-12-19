const PRODUCT_API = 'http://49.236.137.63';
export const imageHandleURI = `${PRODUCT_API}/products/picture`;
export const productHandleURI = `${PRODUCT_API}/products`;
export const loginStatusHandleURI = 'http:/10.180.170.213:5001/myInfo';
export const naverLoginURI = 'http://10.180.170.213:5001/naver/login';
export const addUserURI = 'http://10.180.170.213:5001/addUser';
export const productDetailAPI = (id) => `${PRODUCT_API}/products/${id}`;
export const logOutURI = 'http://10.180.170.213:5001/logout';
export const productList = `${PRODUCT_API}/products`
export const cagtegoryInfo = `${PRODUCT_API}/info/category`;
export const keywordURI = `${PRODUCT_API}/info/keyword`;
export const routes = {
  PRODUCT: '/product',
  LOCATION_FILTER: '/service/location',
  SEARCH: '/service/search',
  FILTER: '/service/category',
};
