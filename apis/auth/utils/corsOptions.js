import uri from '../assets/uris';

const toAllowSetCookie = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      origin: uri.productionClientHost,
      methods: 'GET,POST,DELETE',
      credentials: true,
      preflightContinue: true,
    };
  }
  return {
    origin: uri.clientHost,
    methods: 'GET,POST,DELETE',
    credentials: true,
    preflightContinue: true,
  };
};

export default toAllowSetCookie;
