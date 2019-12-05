import express from 'express';
import {
  redirectToNaverLoginForm,
  login,
  getUserInfoFromResourceServer,
} from './controller/naverOAuth';
import { getAccessToken, fetchUserInfo } from './middlewares/naverOAuth';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('폴은 Naver OAuth 사용중');
});

router.get('/login', redirectToNaverLoginForm);
router.get('/callback', getAccessToken, fetchUserInfo, login);
router.get('/member', getUserInfoFromResourceServer);

module.exports = router;
