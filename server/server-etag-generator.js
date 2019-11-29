import etag from 'etag';
import { getLastModified } from '../../core';

const convertStringFromRequest = (req) => {
  const params = JSON.stringify(req.params);
  const query = JSON.stringify(req.query);
  const body = JSON.stringify(req.body);
  const lastModified = getLastModified().toString();
  return params + query + body + lastModified;
};

const etagGenerator = (req, res, next) => {
  const stringRequest = convertStringFromRequest(req);
  const etagHeader = etag(stringRequest);
  res.setHeader('ETag', etagHeader);
  if (req.header('If-None-Match') === etagHeader) {
    res.json([]);
  } else {
    next();
  }
};

export default etagGenerator;
