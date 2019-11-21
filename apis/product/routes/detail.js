import express from 'express';
import { getProductById } from './middleware/list';
import { isLoggedInUser, getUserStatus } from '../services/user';
import { updateProduct } from './middleware/write';
import {
  isAuthor,
  deleteItem,
} from './middleware/delete';

const router = express.Router();

router.route('/:id')
  .get(getProductById)
  .put(isLoggedInUser,
    getUserStatus,
    updateProduct)
  .delete(isLoggedInUser,
    isAuthor,
    deleteItem);

export default router;
