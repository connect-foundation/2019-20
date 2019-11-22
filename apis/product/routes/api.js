import express from 'express';
import swagger from './swagger';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Product API version 1.0.0');
});
router.use('/docs', swagger);

module.exports = router;
