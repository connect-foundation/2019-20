import express from 'express';
import controller from './controller/info';
import isLoggedInUser from './middleware/user';

const router = express.Router();

router.get('/category', controller.getProductSchemaController);
router.get('/keyword', controller.getKeywordController);
router.get('/user/products', isLoggedInUser, controller.getProductUserList);

export default router;
