import express from 'express';
import modifyProductController from './controller/modifyProduct';
import { getProductById } from './middleware/list';
import { isLoggedInUser, getUserStatus } from '../services/user';
import {
  isAuthor,
  deleteItem,
} from './middleware/delete';

const router = express.Router();

router.route('/:id')
  .get(getProductById)
  .put(isLoggedInUser,
    getUserStatus,
    modifyProductController)
  .delete(isLoggedInUser,
    isAuthor,
    deleteItem);

export default router;
