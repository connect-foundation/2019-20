import axios from 'axios';
import msg from '../../assets/errorMessages';

const getClientID = (host) => {
  if (host === 'auth.oemarket.shop') {
    return process.env.CLIENT_ID;
  }
  if (host === 'auth.oemarket.shop:5000') {
    return process.env.TEST_CLIENT_ID;
  }
  if (host === 'localhost:5000') {
    return process.env.DEV_CLIENT_ID;
  }
  return null;
};
const getClientSecret = (host) => {
  if (host === 'auth.oemarket.shop') {
    return process.env.CLIENT_SECRET;
  }
  if (host === 'auth.oemarket.shop:5000') {
    return process.env.TEST_CLIENT_SECRET;
  }
  if (host === 'localhost:5000') {
    return process.env.DEV_CLIENT_SECRET;
  }
  return null;
};

const redirectGithubLogin = (req, res) => {
  const { host } = req.headers;

  const id = getClientID(host);
  const githubLogin = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${id}`;
  res.redirect(githubLogin);
};
const getAccessToken = async (req, res, next) => {
  const { code } = req.query;
  const { host } = req.headers;
  const id = getClientID(host);
  const secret = getClientSecret(host);

  const options = {
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${id}&client_secret=${secret}&code=${code}`,
    headers: {
      accept: 'application/json',
    },
  };
  try {
    const {
      // eslint-disable-next-line camelcase
      data: { access_token },
    } = await axios(options);
    // eslint-disable-next-line camelcase
    res.locals.token = access_token;
    next();
  } catch (e) {
    next({ status: 500, message: msg.githubError });
  }
};

const fetchUserInfo = async (req, res, next) => {
  const { token } = res.locals;

  const options = {
    method: 'get',
    headers: {
      Authorization: `token ${token}`,
    },
    url: 'https://api.github.com/user/emails',
  };
  const nameOptions = {
    method: 'get',
    headers: {
      Authorization: `token ${token}`,
    },
    url: 'https://api.github.com/user',
  };

  try {
    const { data } = await axios(options);
    const { email } = data[0];
    const response = await axios(nameOptions);
    const { name } = response.data;
    res.locals = { email, name };
    next();
  } catch (e) {
    next({ status: 500, message: msg.githubError });
  }
};

export { redirectGithubLogin, getAccessToken, fetchUserInfo };
