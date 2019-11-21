import model from '../../db/model';
import message from './message';

const Product = model.product;

const checkRequiredField = (req, res, next) => {
  const fieldName = ['title', 'userId', 'latitude', 'longitude', 'zipCode', 'price', 'contents', 'productStatus', 'deliverAvailable', 'category'];
  const inputFields = Object.keys(req.body);
  const requiredItemEntered = fieldName.every((name) => inputFields.includes(name));
  if (requiredItemEntered) {
    next();
  } else {
    res.status(400).json({
      message: message.enterAllRequiredFields,
    });
  }
};

const useMongooseValidator = async (req, res, next) => {
  const product = new Product(req.body);
  try {
    await product.validate();
    res.locals.product = product;
    next();
  } catch (e) {
    res.status(400).json({
      message: e,
    });
  }
};

const saveProduct = async (req, res) => {
  try {
    await res.locals.product.save();
    res.json(res.locals.product);
  } catch (e) {
    res.status(400).json({
      message: message.errorProcessing,
    });
  }
};

const updateProduct = async (req, res) => {
  const { body, params: { id } } = req;
  const fieldName = Object.keys(body).filter((key) => key !== 'id');
  const updateData = fieldName.reduce((field, name) => ({
    ...field,
    [name]: body[name],
  }), {});
  const beforeData = await Product.findByIdAndUpdate(id, { $set: updateData });
  res.json({
    beforeData, updateData,
  });
};

export {
  checkRequiredField,
  useMongooseValidator,
  saveProduct,
  updateProduct,
};
