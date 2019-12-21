export const isAlreadyViewed = ({ params: { id }, cookies }, res, next) => {
  const { view } = cookies;
  if (view && view.split(',').includes(id)) {
    res.locals.read = true;
    res.locals.views = view;
  } else {
    next();
  }
};

export const setCookieView = ({ params: { id } }, res, next) => {
  const { locals: { read } } = res;
  if (!read) {
    const { views } = res.locals;
    const list = (views) ? `${views},${id}` : id;
    res.cookie('view', list, { httpOnly: true, secure: true });
  }
  next();
};
