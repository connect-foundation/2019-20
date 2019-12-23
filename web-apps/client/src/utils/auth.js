// eslint-disable-next-line import/prefer-default-export
export const isLoggedIn = (user) => {
  return !!(user.fetched && user.id);
};
export const isFetched = (user) => {
  return user.fetched;
};
