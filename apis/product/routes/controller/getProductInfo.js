import { getProducts } from '../../core';

const getProductListController = async (req, res, next) => {
  const {
    page,
    limits,
    filters,
    sort,
  } = res.locals;
  const list = await getProducts(page, limits, filters, sort);
  if (typeof list === 'string') {
    next({ status: 400, message: list });
  } else {
    res.json(list);
  }
};

const findProductByIdController = async ({ params: { id } }, res, next) => {
  const result = await getProducts(1, 1, { _id: id });
  if (typeof result === 'string') {
    next({ status: 400, message: result });
  } else {
    res.json(result);
  }
};

export { getProductListController, findProductByIdController };
