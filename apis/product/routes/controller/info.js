import { getProductSchemaByKey, getRecommandKeyword } from '../../core';

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
};
