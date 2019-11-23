import { insertProduct } from '../../core';

const writeProductCotroller = async ({ body }, res, next) => {
  const result = await insertProduct(body);
  if (typeof result === 'string') {
    next({ status: 400, message: result });
  } else {
    res.json(result);
  }
};

export default writeProductCotroller;
