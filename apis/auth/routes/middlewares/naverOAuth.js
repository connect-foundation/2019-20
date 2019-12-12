import axios from 'axios';
import uri from '../../assets/uris';
import msg from '../../assets/errorMessages';

const getAccessToken = async (req, res, next) => {
  const { NAVER_CLIENT_ID, NAVER_CLIENT_SECRET } = process.env;
  const redirectURI = encodeURI(process.env.Naver_Callback);
  const { code, state } = req.query;
  const apiUrl = `${uri.naverTokenControl}?grant_type=authorization_code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}&redirect_uri=${redirectURI}&code=${code}&state=${state}`;

  const options = {
    method: 'get',
    url: apiUrl,
    headers: {
      'X-Naver-Client-Id': NAVER_CLIENT_ID,
      'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
    },
  };
  try {
    const { status, data } = await axios(options);
    if (status === 200) {
      const token = data.access_token;
      res.locals.access_token = token;
      next();
    } else {
      next({ status: 500, message: msg.naverError });
    }
  } catch (e) {
    next({ status: 500, message: msg.naverError });
  }
};

const fetchUserInfo = async (req, res, next) => {
  const token = res.locals.access_token;

  const options = {
    method: 'get',
    url: uri.naverMemberProfileAccess,
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const { status, data } = await axios(options);
    if (status === 200) {
      const { name, email } = data.response;
      res.locals = { name, email };
      next();
    } else {
      next({ status: 500, message: msg.naverError });
    }
  } catch (e) {
    next({ status: 500, message: msg.naverError });
  }
};

export { getAccessToken, fetchUserInfo };
