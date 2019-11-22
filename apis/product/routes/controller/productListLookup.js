import { getProducts } from '../../core';

const productListLookupController = async (req, res) => {
  const {
    options = {},
    sort = { order: -1, createAt: 1 },
    page = 1,
    limits = 10,
  } = res.lcoals;

  const result = await getProducts(options, sort, page, limits);
  res.json(result);
};

export default productListLookupController;
