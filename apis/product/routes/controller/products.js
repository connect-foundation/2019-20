import {
  removeProduct,
  getProducts,
  getElasticSearchResults,
  updateProduct,
  insertProduct,
  updateHits,
} from '../../core';
import getSellerInfo from '../../core/callAPI';

export const deleteProductController = async ({ params: { id } }, res, next) => {
  try {
    const result = await removeProduct(id, res.locals.userId);
    res.json(result);
  } catch (e) {
    next({ status: 500, message: e.toString() });
  }
};

export const getProductListController = async (req, res, next) => {
  if (res.locals.filter) {
    res.locals.query = {
      bool: {
        must: res.locals.filter,
      },
    };
    delete res.locals.filter;
  }
  try {
    const list = await getElasticSearchResults(res.locals);
    res.json(list);
  } catch (e) {
    next({ status: 400, message: e.toString() });
  }
};

export const findProductByIdController = async ({ params: { id } }, res, next) => {
  let product;
  let seller;
  try {
    const { locals: { read } } = res;
    if (!read) {
      updateHits(id);
    }
    const result = await getProducts(1, 1, { _id: id });
    [product] = result;
  } catch (e) {
    next({ status: 400, message: e.toString() });
  }
  try {
    seller = await getSellerInfo(product.userId);
  } catch (e) {
    seller = null;
  }
  res.send({ product, seller });
};

export const modifyProductController = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;
  const {
    locals: { userId },
  } = res;
  try {
    const result = await updateProduct(id, userId, body);
    res.json(result);
  } catch (e) {
    next({ status: 400, message: e.toString() });
  }
};

export const productListLookupController = async (req, res, next) => {
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

export const writeProductCotroller = async ({ body }, res, next) => {
  try {
    const result = await insertProduct(body);
    res.json(result);
  } catch (e) {
    next({ status: 400, message: e.toString() });
  }
};
