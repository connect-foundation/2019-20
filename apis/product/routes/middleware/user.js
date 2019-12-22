import jwt from 'jsonwebtoken';

const isLoggedInUser = async (req, res, next) => {
  try {
    const token = jwt.verify(req.cookies.jwt, process.env.TOKEN);
    res.locals.userId = token.id;
    next();
  } catch (e) {
    next({ status: 403, message: '비정상적인 접근' });
  }
};

export default isLoggedInUser;
