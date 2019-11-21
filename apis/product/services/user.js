const isLoggedInUser = (req, res, next) => {
  next();
};
const getUserStatus = (req, res, next) => {
  res.locals.userId = '김철수';
  next();
};

export { isLoggedInUser, getUserStatus };
