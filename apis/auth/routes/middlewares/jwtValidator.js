import jwt from 'jsonwebtoken';
import msg from '../../assets/errorMessages';

const jwtValidator = (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    const data = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    res.locals.info = data;
    next();
  } catch (error) {
    next({ status: 500, message: msg.invalidJwtToken });
  }
};

export default jwtValidator;
