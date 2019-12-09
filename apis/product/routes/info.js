import express from 'express';
import getProductSchemaController from './controller/info';

const router = express.Router();

router.get('/category', getProductSchemaController);

export default router;
