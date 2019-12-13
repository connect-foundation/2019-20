import { getProductSchemaByKey } from '../../core';

const getProductSchemaController = (req, res) => {
  const list = getProductSchemaByKey('category').enumValues;
  res.json(list);
};

export default getProductSchemaController;
