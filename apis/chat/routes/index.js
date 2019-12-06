import express from 'express';
import { chat } from './controller';

const router = express.Router();

router.post('/chat', chat.startChat);

router.get('/chat/:id', chat.getChat);

router.put('/chat/:id', chat.saveMessage);


module.exports = router;
