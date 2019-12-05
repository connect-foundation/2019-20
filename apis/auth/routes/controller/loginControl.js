import jwt from 'jsonwebtoken';
import uri from '../../assets/uris';

const getUserInfoByJWT = (req, res, next) => {
  const {info} = res.locals;
  const {id, name, email, latitude, longitude} = info;
  if (info === 'invalid token') {
    res.redirect('/logout');
  } else if (id && name.length && email.length && latitude && longitude) {
    res.json(info);
  } else {
    next({status: 500, message: 'internal error'});
  }
};

const logOutProcess = (req, res) => {
  res.clearCookie('jwt');
  res.end();
};

const login = async (req, res) => {
  const {id, name, email, authority, latitude, longitude} = res.locals;
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
    res.cookie('jwt', token, {path: '/', httpOnly: true});
    res.redirect(uri.clientMainPage);
  } else {
    const token = jwt.sign({name, email}, process.env.JWT_PRIVATE_KEY);
    res.cookie('jwt', token, {path: '/enrollLocation', httpOnly: true});
    res.redirect(uri.enrollLocationPage);
  }
};

export {getUserInfoByJWT, logOutProcess, login};
