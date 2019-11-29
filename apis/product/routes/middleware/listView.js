import {
  convertStringStatusToQuery,
  convertStringPriceRangeToQuery,
  convertStringCategoryToQuery,
  convertStringOrderToOption,
} from '../../core/string-conveter';

const addFilter = (filter = [], query) => {
  if ('range' in query) {
    return [...filter, query];
  }
  return [...filter, { bool: query }];
};

const addFromToOption = ({ query: { from } }, res, next) => {
  const number = parseInt(from, 10);
  if (number > 0) {
    res.locals.from = number;
  }
  next();
};

const addNumberOfListToOption = ({ query: { limits } }, res, next) => {
  const number = parseInt(limits, 10);
  if (number > 0) {
    res.locals.size = number;
  }
  next();
};

const addCategoryToFilter = ({ query: { category } }, res, next) => {
  if (category) {
    try {
      const query = convertStringCategoryToQuery(category);
      res.locals.filter = addFilter(res.locals.filter, query);
    } catch (e) {
      next({
        status: 400,
        message: e.message,
      });
    }
  }
  next();
};

// TODO Elastic Search에 맞는 위키 기반 쿼리
const addZipCodeToFilter = ({ query: { zipCode } }, res, next) => {
  if (zipCode) {
    res.locals.filter = {
      ...res.locals.filter,
      zipCode,
    };
  }
  next();
};

const addPriceToFilter = ({ query: { price } }, res, next) => {
  if (price) {
    try {
      const query = convertStringPriceRangeToQuery(price);
      res.locals.filter = addFilter(res.locals.filter, query);
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
      res.locals.filter = addFilter(res.locals.filter, query);
    } catch (e) {
      next({
        status: 400,
        message: e.message,
      });
    }
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

// TODO 키워드 검색(토크나이저...)
const addKeywordTofilter = ({ query: { keyword } }, res, next) => {
  if (keyword) {
    res.locals.keyword = {
      term: { title: keyword },
    };
  }
  next();
};

const queryAnalysisMiddleware = [
  addKeywordTofilter,
  addFromToOption,
  addNumberOfListToOption,
  addCategoryToFilter,
  addZipCodeToFilter,
  addPriceToFilter,
  addDealStatusToFilter,
  addOrderToOption,
];

export default queryAnalysisMiddleware;
