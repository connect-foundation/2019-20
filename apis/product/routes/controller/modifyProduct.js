import updateProduct from '../../core';

const modifyProductController = async (req, res) => {
  const { body, params: { id } } = req;
  const { locals: { userId } } = res;
  const result = await updateProduct(id, userId, body);
  if (typeof result === 'string') {
    res.status(400).json(result);
  } else {
    res.json(result);
  }
};

export default modifyProductController;
