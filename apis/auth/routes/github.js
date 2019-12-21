import express from 'express';
import { redirectGithubLogin, getAccessToken, fetchUserInfo } from './middlewares/githubOAuth';
import { checkExistMember } from './middlewares/userManagement';
import { login } from './controller/loginControl';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('오이마켓은  Github OAuth 사용중');
});

router.get('/login', redirectGithubLogin);
router.get('/callback', getAccessToken, fetchUserInfo, checkExistMember, login);

module.exports = router;
