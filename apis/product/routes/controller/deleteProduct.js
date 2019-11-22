import { removeProduct } from '../../core';

const deleteProductController = async ({ params: { id } }, res) => {
  const result = await removeProduct(id, res.locals.userId);
  res.json(result);
};

export default deleteProductController;
