import { updateProduct } from '../../core';

const modifyProductController = async (req, res, next) => {
  const { body, params: { id } } = req;
  const { locals: { userId } } = res;
  try {
    const result = await updateProduct(id, userId, body);
    res.json(result);
  } catch (e) {
    next({ status: 400, message: e.toString() });
  }
};

export default modifyProductController;
