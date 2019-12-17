import uri from '../assets/uris';

const toAllowSetCookie = {
  origin: uri.clientHost,
  methods: 'GET,POST,DELETE',
  credentials: true,
  preflightContinue: true,
};

export default toAllowSetCookie;
