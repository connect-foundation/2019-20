import { removeProduct } from '../../core';

const deleteProductController = async ({ params: { id } }, res, next) => {
  try {
    const result = await removeProduct(id, res.locals.userId);
    res.json(result);
  } catch (e) {
    next(e);
  }
};

export default deleteProductController;
