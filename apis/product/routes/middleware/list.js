import model from '../../db/model';
import message from '../../core/message';
import { getProducts, getProductSchemaByKey } from '../../core';

const { product } = model;

const checkKeyword = ({ query: { keyword } }, res, next) => {
  if (keyword) {
    res.locals.keyword = {
      title: { $regex: new RegExp(keyword) },
    };
  }
  next();
};

const checkCategoryFilterAndAddFilter = ({ body: { negativeCategory } }, res, next) => {
  const categories = getProductSchemaByKey('category').enumValues;
  const isCorrectCategoryName = (category) => categories.includes(category);
  let categoryTestResult = true;
  if (negativeCategory) {
    categoryTestResult = negativeCategory.every(isCorrectCategoryName);
  }

  if (categoryTestResult) {
    res.locals.category = {
      category: { $nin: negativeCategory },
    };
    next();
  } else {
    res.status(400).json({ message: message.invalidCategory });
  }
};

const addZipCodeFilter = ({ body: { zipCode } }, res, next) => {
  if (zipCode) {
    res.locals.zipCode = {
      zipCode: { $eq: zipCode },
    };
  }
  next();
};

const checkAndAddPriceRangesFilter = ({ body: { price } }, res, next) => {
  let isCorrect = true;
  if (price) {
    const { min, max } = price;
    if (min >= 0 && min > max) isCorrect = false;
    else {
      res.locals.price = {
        $and: [
          { price: { $gte: min } },
          { price: { $lte: max } },
        ],
      };
    }
  }
  if (isCorrect) {
    next();
  } else {
    res.status(400).json({ message: message.invalidPriceRange });
  }
};

const checkAndAddDealStatus = ({ body: { status } }, res, next) => {
  const currentStatus = product.schema.path('currentStatus').enumValues;
  const isCorrectStatusName = (name) => currentStatus.includes(name);
  let statusTestResult = true;
  if (status && status.length > 0) {
    statusTestResult = status.every(isCorrectStatusName);
    res.locals.currentStatus = {
      $or: status.map((name) => ({ currentStatus: { $eq: name } })),
    };
  } else {
    res.locals.currentStatus = {
      $or: [
        { currentStatus: { $eq: '대기' } },
        { currentStatus: { $eq: '거래중' } },
      ],
    };
  }
  if (statusTestResult) {
    next();
  } else {
    res.status(400).json({ message: message.invalidStatus });
  }
};

const getProductList = async ({ query: { page = 1, limits = 10 } }, res) => {
  const filters = Object.values(res.locals).reduce((filter, cur) => ({
    ...filter,
    ...cur,
  }), {});
  try {
    const list = await getProducts(page, limits, filters);
    res.json(list);
  } catch (e) {
    res.status(400).json({ message: message.errorProcessing });
  }
};

const getProductById = async ({ params: { id } }, res) => {
  const item = await product.find({ _id: id });
  res.json(item);
};

export {
  checkKeyword,
  checkCategoryFilterAndAddFilter,
  addZipCodeFilter,
  checkAndAddPriceRangesFilter,
  checkAndAddDealStatus,
  getProductList,
  getProductById,
};
