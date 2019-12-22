export const HTTPS_HOST = 'https://oemarket.shop';
export const HTTP_DEV_HOST = 'http://localhost:3000';
export const HTTP_TEST_HOST = 'http://oemarket.shop:5000';
export const authorizedURL = '.oemarket.shop';

const getURI = (referer, path) => {
  if (
    referer === 'https://oemarket.shop/'
    || referer === 'http://localhost:3000/'
  ) {
    return `${referer}${path}`;
  }
  return null;
};

// req.headers.host
export const client500ErrorPage = (referer) => {
  const path = 'server_error';
  return getURI(referer, path);
};
export const badRequestPage = (referer) => {
  const path = 'bad_request';
  return getURI(referer, path);
};
export const clientMainPage = (referer) => {
  const path = 'service/main';
  return getURI(referer, path);
};
export const enrollLocationPage = (referer) => {
  const path = 'enroll-location';
  return getURI(referer, path);
};
