import {
  getProductSchemaByKey,
  getRecommandKeyword,
  getElasticSearchResults,
} from '../../core';

export default {
  getProductSchemaController: (req, res) => {
    const list = getProductSchemaByKey('category').enumValues;
    res.json(list);
  },

  getKeywordController: async (
    { query: { keyword, fuzzy } }, res, next,
  ) => {
    try {
      const list = await getRecommandKeyword(keyword, fuzzy);
      res.json(list.hits.hits);
    } catch (e) {
      next({ status: 500, message: e.toString() });
    }
  },
  getProductUserList: async ({ query: { from } }, res, next) => {
    const esquery = {
      from: from || 0,
      size: 10,
      query: {
        match: {
          userId: res.locals.userId,
        },
      },
    };
    try {
      const result = await getElasticSearchResults(esquery);
      res.json(result);
    } catch (e) {
      next({ status: 500, message: e.toString() });
    }
  },
};
