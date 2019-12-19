import {
  getElasticSearchResults,
} from '../../core';

export default async ({ query: { id, from } }, res, next) => {
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
};
