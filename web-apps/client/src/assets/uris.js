const client_id = '8f4c544bcba0936615ee';
export const imageHandleURI = 'http://localhost:5000/products/picture';
export const productHandleURI = 'http://localhost:5000/products';
export const loginStatusHandleURI = 'https://auth.oemarket.shop/myInfo';
export const githubLoginURI = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${client_id}`;
export const addUserURI = 'https://auth.oemarket.shop/addUser';
export const productDetailAPI = (id) => `http://localhost:5000/products/${id}`;
export const logOutURI = 'https://auth.oemarket.shop/logout';
export const productList = 'http://localhost:5000/products';
export const cagtegoryInfo = 'http://localhost:5000/info/category';
export const mainPage = 'http://localhost:3000/service/main';
export const routes = {
  LOCATION_FILTER: '/service/location',
  PRODUCT: '/product',
};
export const deleteProductURI = (id) => `http://localhost:5000/products/${id}`;
