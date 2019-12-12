import uri from '../../assets/uris';

const redirectToNaverLoginForm = async (req, res) => {
  const { NAVER_CLIENT_ID } = process.env;
  const state = 'RAMDOM_STATE';
  const redirectURI = encodeURI(uri.naverOAuthCallBackURI);
  const apiUrl = `${uri.naverAuthRequest}?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${redirectURI}&state=${state}`;
  res.redirect(apiUrl);
};

export default redirectToNaverLoginForm;
