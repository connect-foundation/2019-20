import express from 'express';
import redirectToNaverLoginForm from './controller/naverOAuth';
import { getAccessToken, fetchUserInfo } from './middlewares/naverOAuth';
import { checkExistMember } from './middlewares/userManagement';
import { login } from './controller/loginControl';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('폴은 Naver OAuth 사용중');
});

router.get('/login', redirectToNaverLoginForm);
router.get('/callback', getAccessToken, fetchUserInfo, checkExistMember, login);

module.exports = router;
