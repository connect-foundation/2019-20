import jwt from 'jsonwebtoken';

const jwtValidator = (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    const data = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    res.locals.info = data;
  } catch (err) {
    res.locals.info = 'invalid token';
  }
  next();
};

export default jwtValidator;
