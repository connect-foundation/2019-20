import axios from 'axios';
import msg from '../../assets/errorMessages';

const getAccessToken = async (req, res, next) => {
  const { code } = req.query;
  const id = process.env.CLIENT_ID;
  const secret = process.env.CLIENT_SECRET;

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

export { getAccessToken, fetchUserInfo };
