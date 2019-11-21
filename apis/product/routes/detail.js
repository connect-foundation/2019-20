import express from 'express';
import { getProductById } from './middleware/list';

const router = express.Router();

router.route('/:id')
  .get(getProductById);

export default router;
