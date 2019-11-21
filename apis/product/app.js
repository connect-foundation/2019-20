import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import 'core-js';
import db from './db';

import indexRouter from './routes/index';
import productRouter from './routes/product';
import productDetailRouter from './routes/detail';

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
app.use('/detail/products', productDetailRouter);

module.exports = app;
