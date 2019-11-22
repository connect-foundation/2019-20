import express from 'express';
import modifyProductController from './controller/modifyProduct';
import deleteProductController from './controller/deleteProduct';
import { getProductById } from './middleware/list';
import { isLoggedInUser, getUserStatus } from '../services/user';

const router = express.Router();

router.route('/:id')
  .get(getProductById)
  .put(isLoggedInUser,
    getUserStatus,
    modifyProductController)
  .delete(isLoggedInUser,
    deleteProductController);

export default router;
