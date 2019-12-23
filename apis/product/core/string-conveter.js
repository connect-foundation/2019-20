import message from './message';
import { getProductSchemaByKey } from './index';

const convertStringStatusToQuery = (status) => {
  const secretField = '비공개';
  const currentStatus = getProductSchemaByKey('currentStatus').enumValues.filter((name) => name !== secretField);
  const isCorrectStatusName = (name) => currentStatus.includes(name);
  const statusList = status.split(',');
  const statusTestResult = statusList.every(isCorrectStatusName);
  if (!statusTestResult) {
    throw new Error(message.invalidStatus);
  }
  const query = statusList.reduce((cur, name) => [...cur, { match: { currentStatus: name } }], []);
  return { should: query };
};

const convertStringPriceRangeToQuery = (price) => {
  const [min, max] = price.split(',');
  if (+min > 0 && !max) {
    return {
      range: {
        price: { gte: +min },
      },
    };
  }
  if (+min < 0 || +min > +max) {
    throw new Error(message.invalidPriceRange);
  }
  return {
    range: {
      price: {
        gte: +min,
        lte: +max,
      },
    },
  };
};

const convertStringCategoryToQuery = (categories) => {
  const categoryRange = getProductSchemaByKey('category').enumValues;
  const category = categories.split(',');
  const isCorrectCategoryName = (name) => categoryRange.includes(name);
  const properInput = category.every(isCorrectCategoryName);
  if (!properInput) {
    throw new Error(message.invalidCategory);
  }
  const query = category.reduce((cur, name) => [...cur, { match: { category: name } }], []);
  return { should: query };
};

const convertOrderTypeFromString = (option, order) => {
  const type = (order[0] === '-') ? 'asc' : 'desc';
  const name = (type === 'desc') ? order : order.slice(1);
  return [
    ...option,
    { [name]: type },
  ];
};

const convertStringOrderToOption = (order) => {
  const orders = order.split(',');
  const options = orders.reduce(convertOrderTypeFromString, []);
  return options;
};

export {
  convertStringStatusToQuery,
  convertStringPriceRangeToQuery,
  convertStringCategoryToQuery,
  convertStringOrderToOption,
};
