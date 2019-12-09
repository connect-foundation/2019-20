import {
  convertStringStatusToQuery,
  convertStringPriceRangeToQuery,
  convertStringCategoryToQuery,
  convertStringOrderToOption,
} from '../../core/string-conveter';

const addFilter = (filter = [], query) => {
  if ('range' in query || 'term' in query) {
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

const addGeoDistanceFilter = ({ query: { coordinates, distance } }, res, next) => {
  if (coordinates && distance) {
    const [lat, lon] = coordinates.split(',').map((xy) => +xy);
    const query = {
      filter: {
        geo_distance: {
          distance: `${distance}km`,
          location: { lat, lon },
        },
      },
    };
    res.locals.filter = addFilter(res.locals.filter, query);
    res.locals.script_fields = {
      distance: {
        script: {
          lang: 'expression',
          source: 'haversin(lat, lon, doc["location"].lat, doc["location"].lon)',
          params: { lat, lon },
        },
      },
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

// TODO 키워드 검색
const addKeywordTofilter = ({ query: { keyword } }, res, next) => {
  if (keyword) {
    const query = {
      term: { title: keyword },
    };
    res.locals.filter = addFilter(res.locals.filter, query);
  }
  next();
};

const queryAnalysisMiddleware = [
  addKeywordTofilter,
  addFromToOption,
  addNumberOfListToOption,
  addCategoryToFilter,
  addGeoDistanceFilter,
  addPriceToFilter,
  addDealStatusToFilter,
  addOrderToOption,
];

export default queryAnalysisMiddleware;
