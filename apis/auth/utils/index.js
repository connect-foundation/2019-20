const filterObject = (object, fields) => {
  const filteredObject = Object.keys(object)
    .filter((key) => fields.includes(key))
    .reduce((acc, cur) => Object.assign(acc, { [cur]: object[cur] }), {});

  return filteredObject;
};
export default filterObject;
