import uri from "../../assets/uris";

const redirectToNaverLoginForm = async (req, res) => {
  const { NAVER_CLIENT_ID } = process.env;
  const state = "RAMDOM_STATE";
  const redirectURI = encodeURI(process.env.Naver_Callback);
  const apiUrl = `${uri.naverAuthRequest}?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${redirectURI}&state=${state}`;
  res.redirect(apiUrl);
};

const sendUserInfo = (req, res) => {
  const { data } = res.locals;
  res.json(data);
};

export { redirectToNaverLoginForm, sendUserInfo };
