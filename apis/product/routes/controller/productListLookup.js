import { getProducts } from '../../core';

const productListLookupController = async (req, res, next) => {
  const {
    options = {},
    sort = { order: -1, createAt: 1 },
    page = 1,
    limits = 10,
  } = res.lcoals;

  const result = await getProducts(options, sort, page, limits);
  if (typeof result === 'string') {
    next({ status: 400, message: result });
  } else {
    res.json(result);
  }
};

export default productListLookupController;
