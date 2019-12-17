import jwt from 'jsonwebtoken';
import uri from '../../assets/uris';
import msg from '../../assets/errorMessages';

const getUserInfoByJWT = (req, res, next) => {
  const { info } = res.locals;
  if (info === null) {
    res.json(info);
    return;
  }
  if (!info) {
    next({
      status: 500,
      message: msg.internalError,
    });
  }
  const {
    id,
    name,
    email,
    authority,
    latitude,
    longitude,
    reputation,
    numberOfRater,
  } = info;
  if (
    id
    && name.length
    && email.length
    && authority.length
    && latitude
    && longitude
    && reputation >= 0
    && numberOfRater >= 0
  ) {
    res.json({
      id,
      name,
      email,
      authority,
      latitude,
      longitude,
      reputation,
      numberOfRater,
    });
  } else {
    next({ status: 500, message: msg.invalidJwtToken });
  }
};

const logOutProcess = (req, res) => {
  res.clearCookie('jwt');
  res.end();
};

const newAccountLogIn = (req, res) => {
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

  const info = Object.keys(res.locals)
    .filter((key) => fields.includes(key))
    .reduce((acc, cur) => Object.assign(acc, { [cur]: res.locals[cur] }), {});

  const token = jwt.sign(info, process.env.JWT_PRIVATE_KEY);
  res.cookie('jwt', token, {
    httpOnly: true,
  });
  res.json(info);
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
    res.cookie('jwt', token, { httpOnly: true });
    res.redirect(uri.clientMainPage);
  } else {
    const token = jwt.sign({ name, email }, process.env.JWT_PRIVATE_KEY);
    res.cookie('jwt', token, { httpOnly: true });
    res.redirect(uri.enrollLocationPage);
  }
};

export {
  getUserInfoByJWT, logOutProcess, login, newAccountLogIn,
};
