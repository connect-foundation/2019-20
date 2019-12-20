const isLoggedInUser = (req, res, next) => {
  res.locals.userId = req.body.userId;
  next();
};

export default isLoggedInUser;
