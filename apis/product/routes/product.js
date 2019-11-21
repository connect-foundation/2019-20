import express from 'express';
import {
  checkKeyword,
  checkCategoryFilterAndAddFilter,
  addZipCodeFilter,
  checkAndAddPriceRangesFilter,
  checkAndAddDealStatus,
  getProductList,
} from './middleware/list';
import {
  checkRequiredField,
  useMongooseValidator,
  saveProduct,
} from './middleware/write';
import { isLoggedInUser, getUserStatus } from '../services/user';

const router = express.Router();

router.get('/:keyword?', checkKeyword,
  checkCategoryFilterAndAddFilter,
  addZipCodeFilter,
  checkAndAddPriceRangesFilter,
  checkAndAddDealStatus,
  getProductList);

router.post('/', isLoggedInUser,
  getUserStatus,
  checkRequiredField,
  useMongooseValidator,
  saveProduct);

export default router;
