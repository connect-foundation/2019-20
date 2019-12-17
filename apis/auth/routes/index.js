import express from 'express';

import jwtValidator from './middlewares/jwtValidator';
import {
  getUserInfoByJWT,
  logOutProcess,
  newAccountLogIn,
} from './controller/loginControl';
import { addUser } from './middlewares/userManagement';
import findBasicInfoById from './controller/publicInformation';

const router = express.Router();

router.get('/', (req, res) => res.send("Welcome to 오이마켓's auth server"));
router.get('/myInfo', jwtValidator, getUserInfoByJWT);
router.post('/addUser', jwtValidator, addUser, newAccountLogIn);
router.get('/logout', logOutProcess);
router.get('/seller/:id', findBasicInfoById);

module.exports = router;
