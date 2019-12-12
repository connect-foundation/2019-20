const isClientError = (err) => {
  if (err.status / 100 === 4) {
    return true;
  }
  return false;
};
const isServerError = (err) => {
  if (err.status / 100 === 5) {
    return true;
  }
  return false;
};
export { isClientError, isServerError };
