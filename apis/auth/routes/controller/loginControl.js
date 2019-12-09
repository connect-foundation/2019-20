import jwt from 'jsonwebtoken';
import uri from '../../assets/uris';
import msg from '../../assets/errorMessages';

const getUserInfoByJWT = (req, res, next) => {
  const { info } = res.locals;
  if (!info) {
    next({ status: 500, message: msg.internalError });
  }
  const {
    id,
    name,
    email,
    latitude,
    longitude,
    reputation,
    numberOfRater,
  } = info;
  if (
    id
    && name.length
    && email.length
    && latitude
    && longitude
    && reputation
    && numberOfRater
  ) {
    res.json(info);
  } else {
    next({ status: 500, message: msg.invalidJwtToken });
  }
};

const logOutProcess = (req, res) => {
  res.clearCookie('jwt');
  res.end();
};

const login = async (req, res) => {
  const {
    id,
    name,
    email,
    authority,
    latitude,
    longitude,
    reputation,
    numberOfRater,
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
        reputation,
        numberOfRater,
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

export { getUserInfoByJWT, logOutProcess, login };
