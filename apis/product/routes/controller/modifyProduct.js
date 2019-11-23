import { updateProduct } from '../../core';

const modifyProductController = async (req, res, next) => {
  const { body, params: { id } } = req;
  const { locals: { userId } } = res;
  const result = await updateProduct(id, userId, body);
  if (typeof result === 'string') {
    next({ status: 400, message: result });
  } else {
    res.json(result);
  }
};

export default modifyProductController;
