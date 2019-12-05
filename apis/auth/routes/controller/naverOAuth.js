import axios from 'axios';
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
  const { name, email } = res.locals;
  const token = jwt.sign({ name, email }, process.env.JWT_PRIVATE_KEY);
  res.append('Set-Cookie', `jwt=${token}; HttpOnly`);
  res.redirect(uri.clientMainPage);
};

const getUserInfoFromResourceServer = async (req, res, next) => {
  const { token } = req.body;
  const options = {
    method: 'get',
    url: uri.naverMemberProfileAccess,
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const { status, data } = await axios(options);
    if (status === 200) {
      res.json(data);
    } else {
      next({
        status: 500,
        message: '프로필 조회 실패',
      });
    }
  } catch (err) {
    next({
      status: 500,
      message: 'err.message',
    });
  }
};

export { redirectToNaverLoginForm, login, getUserInfoFromResourceServer };
