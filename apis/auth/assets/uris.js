export const HTTPS_HOST = 'https://oemarket.shop';
export const HTTP_HOST = 'http://localhost:3000';

const getURI = (host, path) => {
  if (host === 'auth.oemarket.shop:5000' || host === 'localhost:5000') {
    return `${HTTP_HOST}${path}`;
  }
  return `${HTTPS_HOST}${path}`;
};

// req.headers.host
export const client500ErrorPage = (host) => {
  const path = '/server_error';
  return getURI(host, path);
};
export const badRequestPage = (host) => {
  const path = '/bad_request';
  return getURI(host, path);
};
export const clientMainPage = (host) => {
  const path = '/service/main';
  return getURI(host, path);
};
export const enrollLocationPage = (host) => {
  const path = '/enroll-location';
  return getURI(host, path);
};
