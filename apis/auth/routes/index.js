import express from 'express';

const router = express.Router();

router.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.send('Logout successfully!');
});

module.exports = router;
