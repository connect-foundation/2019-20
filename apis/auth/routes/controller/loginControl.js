import jwt from 'jsonwebtoken';
import {
  enrollLocationPage,
  clientMainPage,
  authorizedURL,
} from '../../assets/uris';
import msg from '../../assets/errorMessages';
import filterObject from '../../utils';

export const getUserInfoByJWT = (req, res, next) => {
  const { info } = res.locals;
  if (info === null || !info.id) {
    res.json(info);
    return;
  }
  if (!info) {
    next({
      status: 500,
      message: msg.internalError,
    });
  }
  const fields = [
    'id',
    'name',
    'email',
    'authority',
    'latitude',
    'longitude',
    'reputation',
    'numberOfRater',
  ];
  const user = filterObject(info, fields);
  if (
    user.id.length
    && user.name.length
    && user.email.length
    && user.authority.length
    && user.latitude
    && user.longitude
    && user.reputation >= 0
    && user.numberOfRater >= 0
  ) {
    res.json(user);
  } else {
    next({ status: 500, message: msg.invalidJwtToken });
  }
};

export const logOutProcess = (req, res) => {
  res.clearCookie('jwt', { httpOnly: true, domain: authorizedURL });
  res.end();
};

export const newAccountLogIn = (req, res) => {
  const fields = [
    'id',
    'name',
    'email',
    'authority',
    'latitude',
    'longitude',
    'reputation',
    'numberOfRater',
  ];

  const info = filterObject(res.locals, fields);

  const token = jwt.sign(info, process.env.JWT_PRIVATE_KEY);
  res.cookie('jwt', token, {
    httpOnly: true,
    domain: authorizedURL,
  });
  res.json(info);
};

export const login = async (req, res) => {
  const { referer } = req.headers;
  const fields = [
    'id',
    'name',
    'email',
    'authority',
    'latitude',
    'longitude',
    'reputation',
    'numberOfRater',
  ];

  const info = filterObject(res.locals, fields);

  if (info.id && info.id.length) {
    const token = jwt.sign(info, process.env.JWT_PRIVATE_KEY);
    res.cookie('jwt', token, { httpOnly: true, domain: authorizedURL });
    res.redirect(clientMainPage(referer));
  } else {
    const token = jwt.sign(
      { name: info.name, email: info.email },
      process.env.JWT_PRIVATE_KEY,
    );
    res.cookie('jwt', token, { httpOnly: true, domain: authorizedURL });
    res.redirect(enrollLocationPage(referer));
  }
};

export const sendJWT = (req, res, next) => {
  const { info } = res.locals;
  const token = req.cookies.jwt;
  if (info === null || !info.id) {
    res.json({ token });
  } else if (info.id) {
    res.json({ token });
  } else {
    next({ status: 500, message: msg.internalError });
  }
};
