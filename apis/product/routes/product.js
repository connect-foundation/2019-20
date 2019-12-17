import express from 'express';
import isLoggedInUser from '../services/user';
import queryAnalysisMiddleware from './middleware/listView';
import {
  modifyProductController,
  deleteProductController,
  writeProductCotroller,
  getProductListController,
  findProductByIdController,
} from './controller/products';

const router = express.Router();

/**
 * 상품 조회 query 예시
 * keyword=갤럭시
 * limits=1
 * size=10 한번에 표시할 리스트의 갯수 (기본 10)
 * category=기타 중고물품,여성의류
 * coordinates=lat,lon&distance=1 (좌표, x km)
 * price=1,200 (최소, 최댓값) 혹은 price=1(1이상)
 * status=거래중,거래완료
 * order=order,-userId (order 오름차순, userId 내림차순)
 * buyer=구매자
 * interest=사용자
 */
router.route('/')
  .get(queryAnalysisMiddleware, getProductListController)
  .post(isLoggedInUser,
    writeProductCotroller);

router.route('/:id')
  .get(findProductByIdController)
  .put(isLoggedInUser,
    modifyProductController)
  .delete(isLoggedInUser,
    deleteProductController);

export default router;
