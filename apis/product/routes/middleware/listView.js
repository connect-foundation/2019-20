import {
  convertStringStatusToQuery,
  convertStringPriceToQuery,
  convertStringCategoryToQuery,
  convertStringOrderToOption,
} from '../../core/string-conveter';

const addPageToOption = ({ query: { page } }, res, next) => {
  const number = parseInt(page, 10);
  if (number > 0) {
    res.locals.page = number;
  }
  next();
};

const addNumberOfListToOption = ({ query: { limits } }, res, next) => {
  const number = parseInt(limits, 10);
  if (number > 0) {
    res.locals.limits = number;
  }
  next();
};

const addCategoryToFilter = ({ query: { category } }, res, next) => {
  if (category) {
    try {
      const query = convertStringCategoryToQuery(category);
      res.locals.filters = { ...res.locals.filters, ...query };
    } catch (e) {
      next({
        status: 400,
        message: e.message,
      });
    }
  }
  next();
};

const addZipCodeToFilter = ({ query: { zipCode } }, res, next) => {
  if (zipCode) {
    res.locals.filters = {
      ...res.locals.filters,
      zipCode,
    };
  }
  next();
};

const addPriceToFilter = ({ query: { price } }, res, next) => {
  if (price) {
    try {
      const query = convertStringPriceToQuery(price);
      res.locals.filters = {
        ...res.locals.filters,
        ...query,
      };
    } catch (e) {
      next({
        status: 400,
        message: e.message,
      });
    }
  }
  next();
};

const addDealStatusToFilter = ({ query: { status } }, res, next) => {
  if (status && status.length > 0) {
    try {
      const query = convertStringStatusToQuery(status);
      res.locals.filters = {
        ...res.locals.filters,
        ...query,
      };
    } catch (e) {
      next({
        status: 400,
        message: e.message,
      });
    }
  } else {
    res.locals.filters = {
      ...res.locals.filters,
      $or: [
        { currentStatus: '대기' },
        { currentStatus: '거래중' },
      ],
    };
  }
  next();
};

const addOrderToOption = ({ query: { sort } }, res, next) => {
  if (sort) {
    const option = convertStringOrderToOption(sort);
    res.locals.sort = option;
  }
  next();
};

const addKeywordTofilter = ({ query: { keyword } }, res, next) => {
  if (keyword) {
    res.locals.filters = { ...res.locals.filters, title: { $regex: new RegExp(keyword) } };
  }
  next();
};

const queryAnalysisMiddleware = [
  addKeywordTofilter,
  addPageToOption,
  addNumberOfListToOption,
  addCategoryToFilter,
  addZipCodeToFilter,
  addPriceToFilter,
  addDealStatusToFilter,
  addOrderToOption,
];

export default queryAnalysisMiddleware;
