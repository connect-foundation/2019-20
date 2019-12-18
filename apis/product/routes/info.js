import express from 'express';
import controller from './controller/info';


const router = express.Router();

router.get('/category', controller.getProductSchemaController);
router.get('/keyword', controller.getKeywordController);
router.get('/user/products', controller.getKeywordController);

export default router;
