import model from '../../db/model';
import message from '../../core/message';

const Product = model.product;

const isAuthor = async ({ params: { id } }, res, next) => {
  const item = await Product.findById(id);
  if (item.userId !== res.locals.userId) {
    res.status(401).json({
      message: message.doNotHavePermission,
    });
  } else {
    next();
  }
};

const deleteItem = async ({ params: { id } }, res) => {
  const { ok } = await Product.deleteOne({ _id: id });
  if (!ok) {
    res.status(400).json({
      message: message.errorProcessing,
    });
  } else {
    res.json(ok);
  }
};

export { isAuthor, deleteItem };
