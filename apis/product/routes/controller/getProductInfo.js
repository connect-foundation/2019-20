import { getProducts } from '../../core';

const getProductListController = async (req, res, next) => {
  const {
    page,
    limits,
    filters,
    sort,
  } = res.locals;
  try {
    const list = await getProducts(page, limits, filters, sort);
    res.json(list);
  } catch (e) {
    next({ status: 400, message: e.toString() });
  }
};

const findProductByIdController = async ({ params: { id } }, res, next) => {
  try {
    const result = await getProducts(1, 1, { _id: id });
    res.json(result);
  } catch (e) {
    next({ status: 400, message: e.toString() });
  }
};

export { getProductListController, findProductByIdController };
