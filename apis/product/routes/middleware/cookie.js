export const isAlreadyViewed = (req, res, next) => {
  const { view } = req.cookies;
  const { params: { id } } = req;
  if (view && view.split(',').includes(id)) {
    res.locals.read = true;
    res.locals.views = view;
  }
  next();
};

export const setCookieView = (req, res, next) => {
  const { params: { id } } = req;
  const { locals: { read, views } } = res;
  if (!read) {
    const list = (views) ? `${views},${id}` : id;
    res.cookie('view', list, {
      maxAge: 20 * 365 * 30 * 24 * 60 * 3600,
      secure: (req.protocol === 'https'),
      httpOnly: true,
      sameSite: false,
    });
  }
  next();
};
