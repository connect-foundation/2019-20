import uri from '../assets/uris';

const toAllowSetCookie = {
  origin: uri.clientHost,
  methods: 'GET,POST',
  credentials: true,
  preflightContinue: true,
};

export default toAllowSetCookie;
