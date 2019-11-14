const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ title: 'Project 48', content: '당신을 위한 중고거래' });
});

module.exports = router;
