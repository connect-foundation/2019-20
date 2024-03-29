// 인증
const AUTH_API = 'https://auth.oemarket.shop';
// const AUTH_API = 'http://auth.oemarket.shop:5000';
// const AUTH_API = 'http://localhost:5000';
export const AUTH = {
  LOGIN_STATUS_HANDLE: `${AUTH_API}/myinfo`,
  ADD_USER: `${AUTH_API}/addUser`,
  LOGOUT: `${AUTH_API}/logout`,
  FETCH_TOKEN_PATH: `${AUTH_API}/myToken`,
  WITHDRAWAL: `${AUTH_API}/myinfo`,
  githubLoginURI: `${AUTH_API}/github/login`,
  GET_TOKEN: `${AUTH_API}/myToken`,
};

// 상품
const PRODUCT_API = 'https://product.oemarket.shop';
// const PRODUCT_API = 'http://product.oemarket.shop:5000';
export const PRODUCT = {
  IMAGE_HANDLE: `${PRODUCT_API}/products/picture`,
  PRODUCT_HANDLE: `${PRODUCT_API}/products`,
  PRODUCT_LIST: `${PRODUCT_API}/products`,
  CATEGORY_INFO: `${PRODUCT_API}/info/category`,
  KEYWORD_SEARCH: `${PRODUCT_API}/info/keyword`,
  PRODUCT_SELL_LIST_MEMBER: `${PRODUCT_API}/info/user/products`,
  PRODUCT_INTEREST_LIST_MEMBER: `${PRODUCT_API}/products`,
  PRODUCT_BUY_LIST_MEMBER: `${PRODUCT_API}/products`,
  getProdutDetialUri: (id) => `${PRODUCT_API}/products/${id}`,
  deleteProductURI: (id) => `${PRODUCT_API}/products/${id}`,
};

// 채팅
const CHAT_API = 'https://chat.oemarket.shop:80';
export const CHAT = {
  NAME_SPACE: '/chat',
  INIT_PATH: `${CHAT_API}/chat`,
  getChatListQuery: (id) => `${CHAT_API}/chat?uid=${id}`,
};

// client
export const VIEW_WITH_NVAIGATOR = '/service';
export const ROUTES = {
  INDEX: '/',
  MAIN: `${VIEW_WITH_NVAIGATOR}/main`,
  WRITE: '/write',
  PRODUCT: '/product',
  PRODUCT_INFO: '/product/:id',
  LOCATION_FILTER: `${VIEW_WITH_NVAIGATOR}/location`,
  SEARCH: `${VIEW_WITH_NVAIGATOR}/search`,
  FILTER: `${VIEW_WITH_NVAIGATOR}/category`,
  ENROLL_LOCATION: '/enroll-location',
  BUY_LIST: `${VIEW_WITH_NVAIGATOR}/products/buy`,
  FAVORITE_LIST: `${VIEW_WITH_NVAIGATOR}/products/favorite`,
  SELL_LIST: `${VIEW_WITH_NVAIGATOR}/products/sell`,
  MYPAGE: `${VIEW_WITH_NVAIGATOR}/my-page`,
  EDIT: '/edit/:id',
  CHAT: `${VIEW_WITH_NVAIGATOR}/chat`,
  CHAT_ROOM: `${VIEW_WITH_NVAIGATOR}/chat/room`,
  CHAT_ROOM_WITH_ID: `${VIEW_WITH_NVAIGATOR}/chat/room/:_id`,
  getChatRoomPath: (id) => `${VIEW_WITH_NVAIGATOR}/chat/room/${id}`,
};
