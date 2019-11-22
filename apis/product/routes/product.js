import express from 'express';
import {
  checkRequiredField,
  useMongooseValidator,
  saveProduct,
} from './middleware/write';
import queryAnalysisMiddleware from './middleware/listView';
import modifyProductController from './controller/modifyProduct';
import deleteProductController from './controller/deleteProduct';
import { isLoggedInUser, getUserStatus } from '../services/user';
import { getProductListController, findProductByIdController } from './controller/getProductInfo';

const router = express.Router();

/**
 * 상품 조회 query 예시
 * keyword=갤럭시
 * page=1
 * limits=10 한번에 표시할 리스트의 갯수 (기본 10)
 * category=기타 중고물품,여성의류
 * zipCode=12345
 * price=1,200 (최소, 최댓값) 혹은 price=1(1이상)
 * status=거래중,거래완료
 * order=order,-userId (order 오름차순, userId 내림차순)
 */
router.route('/')
  .get(...queryAnalysisMiddleware, getProductListController)
  .post(isLoggedInUser,
    getUserStatus,
    checkRequiredField,
    useMongooseValidator,
    saveProduct);

router.route('/:id')
  .get(findProductByIdController)
  .put(isLoggedInUser,
    getUserStatus,
    modifyProductController)
  .delete(isLoggedInUser,
    deleteProductController);

export default router;
