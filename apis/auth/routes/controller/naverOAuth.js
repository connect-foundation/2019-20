import jwt from 'jsonwebtoken';
import uri from '../../assets/uris';

const redirectToNaverLoginForm = (req, res) => {
  const { NAVER_CLIENT_ID } = process.env;
  const state = 'RAMDOM_STATE';
  const redirectURI = encodeURI(process.env.Naver_Callback);
  const apiUrl = `${uri.naverAuthRequest}?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${redirectURI}&state=${state}`;
  res.redirect(apiUrl);
};

const login = async (req, res) => {
  const {
    id, name, email, authority, latitude, longitude,
  } = res.locals;
  if (id) {
    const token = jwt.sign(
      {
        id,
        name,
        email,
        authority,
        latitude,
        longitude,
      },
      process.env.JWT_PRIVATE_KEY,
    );
    res.cookie('jwt', token, { path: '/', httpOnly: true });
    res.redirect(uri.clientMainPage);
  } else {
    const token = jwt.sign({ name, email }, process.env.JWT_PRIVATE_KEY);
    res.cookie('jwt', token, { path: '/enrollLocation', httpOnly: true });
    res.redirect(uri.enrollLocationPage);
  }
};

const sendUserInfo = (req, res) => {
  const { data } = res.locals;
  res.json(data);
};

export { redirectToNaverLoginForm, login, sendUserInfo };
