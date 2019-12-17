import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './routes/index';
import naverRouter from './routes/naver';

import toAllowSetCookie from './utils/corsOptions';

import {
  serverErrorHandler,
  clientErrorHandler,
} from './routes/controller/errorHandler';

const app = express();

app.use(cors(toAllowSetCookie));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/naver', naverRouter);

app.use(serverErrorHandler);
app.use(clientErrorHandler);

module.exports = app;