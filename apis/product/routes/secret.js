import express from 'express';
import isLoggedInUser from '../services/user';
import getProducts from './controller/secret';

const router = express.Router();

router.get('/', isLoggedInUser, getProducts);

export default router;
