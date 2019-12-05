import express from 'express';
import { redirectToNaverLoginForm, sendUserInfo } from './controller/naverOAuth';
import {
  getAccessToken,
  fetchUserInfo,
  getUserInfoFromResourceServer,
} from './middlewares/naverOAuth';
import { checkExistMember } from './middlewares/userManagement';
import { login } from './controller/loginControl';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('폴은 Naver OAuth 사용중');
});

router.get('/login', redirectToNaverLoginForm);
router.get('/callback', getAccessToken, fetchUserInfo, checkExistMember, login);
router.get('/member', getUserInfoFromResourceServer, sendUserInfo);

module.exports = router;
