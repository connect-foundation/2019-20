const isLoggedInUser = (req, res, next) => {
  res.locals.userId = '김철수';
  next();
};

export default isLoggedInUser;
