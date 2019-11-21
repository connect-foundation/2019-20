import fs from 'fs';
import path from 'path';

const collectFileForBuildModel = () => {
  const files = fs.readdirSync(__dirname);
  const fileName = files.filter(
    (name) => /.*.js/.test(name) && name !== 'index.js',
  );
  return fileName;
};

const buildModel = (fileName) => {
  const models = fileName.reduce((list, filename) => {
    const name = filename.slice(0, -3);
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const model = require(path.join(__dirname, filename));

    return {
      ...list,
      [name]: model,
    };
  }, {});

  return models;
};

const jsFiles = collectFileForBuildModel();
const models = buildModel(jsFiles);

export default models;
