import express from 'express';
import {
  checkKeyword,
  checkCategoryFilterAndAddFilter,
  addZipCodeFilter,
  checkAndAddPriceRangesFilter,
  checkAndAddDealStatus,
  getProductList,
} from './middleware/list';

const router = express.Router();

router.get('/:keyword?', checkKeyword,
  checkCategoryFilterAndAddFilter,
  addZipCodeFilter,
  checkAndAddPriceRangesFilter,
  checkAndAddDealStatus,
  getProductList);

export default router;
