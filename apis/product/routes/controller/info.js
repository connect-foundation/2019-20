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
  getProductUserList: async ({ query: { id, from } }, res, next) => {
    if (!id) {
      next({ status: 400, message: '필수항목을 입력하세요' });
    } else {
      const esquery = {
        from: from || 0,
        size: 10,
        query: {
          match: {
            userId: id,
          },
        },
      };
      try {
        const result = await getElasticSearchResults(esquery);
        res.json(result);
      } catch (e) {
        next({ status: 500, message: e.toString() });
      }
    }
  },
};
