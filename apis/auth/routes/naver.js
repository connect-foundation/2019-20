import express from 'express';
import {
  redirectToNaverLoginForm,
  login,
  sendUserInfo,
} from './controller/naverOAuth';
import {
  getAccessToken,
  fetchUserInfo,
  checkExistMember,
  getUserInfoFromResourceServer,
} from './middlewares/naverOAuth';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('폴은 Naver OAuth 사용중');
});

router.get('/login', redirectToNaverLoginForm);
router.get('/callback', getAccessToken, fetchUserInfo, checkExistMember, login);
router.get('/member', getUserInfoFromResourceServer, sendUserInfo);

module.exports = router;
