import { HTTPS_HOST, HTTP_HOST } from '../assets/uris';

const toAllowSetCookie = (protocol) => {
  if (protocol === 'https') {
    return {
      origin: HTTPS_HOST,
      methods: 'GET,POST,UPDATE,DELETE',
      credentials: true,
      preflightContinue: true,
    };
  }
  if (protocol === 'http') {
    return {
      origin: HTTP_HOST,
      methods: 'GET,POST,UPDATE,DELETE',
      credentials: true,
      preflightContinue: true,
    };
  }
  return null;
};

export default toAllowSetCookie;
