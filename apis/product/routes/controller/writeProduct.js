import { insertProduct } from '../../core';

const writeProductCotroller = async ({ body }, res, next) => {
  try {
    const result = await insertProduct(body);
    res.json(result);
  } catch (e) {
    next({ status: 400, message: e.toString() });
  }
};

export default writeProductCotroller;
