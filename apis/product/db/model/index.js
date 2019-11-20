import fs from 'fs';

const files = fs.readdirSync(__dirname);

const jsFiles = files.filter(
  (name) => /.*.js/.test(name) && name !== 'index.js',
);
const models = jsFiles.reduce((list, filename) => {
  const name = filename.slice(0, -3);
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const model = require(filename);

  return {
    ...list,
    [name]: model,
  };
}, {});

export default models;