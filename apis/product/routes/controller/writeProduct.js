import { insertProduct } from '../../core';

const writeProductCotroller = async ({ body }, res) => {
  const result = await insertProduct(body);
  res.json(result);
};

export default writeProductCotroller;
