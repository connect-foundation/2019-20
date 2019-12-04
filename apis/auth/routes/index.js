import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ title: 'Authentication server', content: '폴을 위한 인증서버' });
});

module.exports = router;
