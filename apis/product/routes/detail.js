import express from 'express';
import { getProductById } from './middleware/list';
import { isLoggedInUser, getUserStatus } from '../services/user';
import { updateProduct } from './middleware/write';

const router = express.Router();

router.route('/:id')
  .get(getProductById)
  .put(isLoggedInUser,
    getUserStatus,
    updateProduct);

export default router;
