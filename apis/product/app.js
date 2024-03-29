import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import indexRouter from './routes/index';
import productRouter from './routes/product';
import infoRouter from './routes/info';
import etagGenerator from './routes/middleware/etag-generator';

import { dbConnect } from './config';
import { WHITELIST } from './assets/uri';

const app = express();

app.use(dbConnect());

app.use(cors({
  origin: WHITELIST,
  methods: 'GET,POST,UPDATE,DELETE,PUT',
  credentials: true,
  preflightContinue: true,
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('*', etagGenerator);

app.use('/', indexRouter);
app.use('/info', infoRouter);
app.use('/products', productRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.message);
});

module.exports = app;
