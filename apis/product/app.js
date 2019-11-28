import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import db from './db';

import indexRouter from './routes/index';
import productRouter from './routes/product';

dotenv.config();
db().catch(() => {
  process.exit();
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/products', productRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const message = err.message.split('|')[0].trim();
  res.status(err.status || 500);
  res.json(message);
});

module.exports = app;
