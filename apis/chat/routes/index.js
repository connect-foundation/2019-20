import express from 'express';
import { chat } from './controller';

const router = express.Router();

router.post('/chat', chat.startChat);

router.get('/chat', chat.getChatByQuery);

router.get('/chat/:id', chat.getChat);

router.put('/chat/:id', chat.saveMessage);

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ title: 'Project 48', content: '당신을 위한 중고거래' });
});

module.exports = router;
