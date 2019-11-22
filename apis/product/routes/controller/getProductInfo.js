import message from '../../core/message';
import { getProducts } from '../../core';

const getProductListController = async (req, res) => {
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
    res.status(400).json({ message: message.errorProcessing });
  }
};

const findProductByIdController = async ({ params: { id } }, res) => {
  const result = await getProducts(1, 1, { _id: id });
  res.json(result);
};

export { getProductListController, findProductByIdController };
