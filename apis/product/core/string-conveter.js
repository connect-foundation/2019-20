import message from './message';
import { getProductSchemaByKey } from './index';

const convertStringStatusToQuery = (status) => {
  const currentStatus = getProductSchemaByKey('currentStatus').enumValues.filter((name) => name !== '비공개');
  const isCorrectStatusName = (name) => currentStatus.includes(name);
  const statusList = status.split(',');
  const statusTestResult = statusList.every(isCorrectStatusName);
  if (!statusTestResult) {
    throw new Error(message.invalidStatus);
  }
  const filter = statusList.map((name) => ({ currentStatus: name }));
  return {
    $or: filter,
  };
};

const convertStringPriceToQuery = (price) => {
  const [min, max] = price.split(',');
  if (min > 0 && !max) {
    return { price: { $gte: min } };
  }
  if (min < 0 || min > max) {
    throw new Error(message.invalidPriceRange);
  }
  return {
    $and: [
      { price: { $gte: min } },
      { price: { $lte: max } },
    ],
  };
};

const convertStringCategoryToQuery = (categories) => {
  const categoryRange = getProductSchemaByKey('category').enumValues;
  const negativeCategory = categories.split(',');
  const isCorrectCategoryName = (name) => categoryRange.includes(name);
  const properInput = negativeCategory.every(isCorrectCategoryName);
  if (!properInput) {
    throw new Error(message.invalidCategory);
  }
  return {
    category: { $nin: negativeCategory },
  };
};

const convertOrderTypeFromString = (option, order) => {
  const type = (order[0] === '-') ? -1 : 1;
  const name = (type > 0) ? order : order.slice(1);
  return {
    ...option,
    [name]: type,
  };
};

const convertStringOrderToOption = (order) => {
  const orders = order.split(',');
  const options = orders.reduce(convertOrderTypeFromString, {});
  return options;
};

export {
  convertStringStatusToQuery,
  convertStringPriceToQuery,
  convertStringCategoryToQuery,
  convertStringOrderToOption,
};
