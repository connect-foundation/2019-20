import { HTTPS_HOST, HTTP_DEV_HOST, HTTP_TEST_HOST } from '../assets/uris';
// eslint-disable-next-line import/prefer-default-export
export const toAllowSetCookie = {
  origin: [HTTPS_HOST, HTTP_DEV_HOST, HTTP_TEST_HOST],
  methods: 'GET,POST,UPDATE,DELETE',
  credentials: true,
  preflightContinue: true,
};
