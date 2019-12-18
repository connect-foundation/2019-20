const objectFilter = (object, fields) => {
  return Object.keys(object)
    .filter((key) => fields.includes(key))
    .reduce((acc, cur) => Object.assign(acc, {[cur]: object[cur]}), {});
};

export default objectFilter;
