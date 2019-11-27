import { getProducts } from '../../core';

const productListLookupController = async (req, res, next) => {
  const {
    options = {},
    sort = { order: -1, createAt: 1 },
    page = 1,
    limits = 10,
  } = res.lcoals;
  try {
    const result = await getProducts(options, sort, page, limits);
    res.json(result);
  } catch (e) {
    next({ status: 400, message: e.toString() });
  }
};

export default productListLookupController;
