import { getProducts, getElasticSearchResults } from '../../core';

const getProductListController = async (req, res, next) => {
  if (res.locals.filter) {
    res.locals.query = {
      bool: {
        must: res.locals.filter,
      },
    };
    delete res.locals.filter;
  }
  if (res.locals.keyword) {
    res.locals.query = {
      ...res.locals.query,
      ...res.locals.keyword,
    }
    delete res.locals.keyword;
  }
  try {
    const list = await getElasticSearchResults(res.locals);
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
