import express from 'express';
import { getProductSchemaByKey } from '../core';

const router = express.Router();

router.get('/category', (req, res) => {
  const list = getProductSchemaByKey('category').enumValues;
  res.json(list);
});

export default router;
