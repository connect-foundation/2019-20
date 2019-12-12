import express from 'express';

import cors from 'cors';
import jwtValidator from './middlewares/jwtValidator';
import {
  getUserInfoByJWT,
  logOutProcess,
  login,
} from './controller/loginControl';
import { addUser } from './middlewares/userManagement';
import toAllowSetCookie from '../utils/corsOptions';

const router = express.Router();

router.get('/', (req, res) => res.send('Welcome to 폴 auth server'));
router.get('/myInfo', jwtValidator, cors(toAllowSetCookie), getUserInfoByJWT);
router.post('/addUser', jwtValidator, addUser, login);
router.get('/logout', cors(toAllowSetCookie), logOutProcess);

module.exports = router;
