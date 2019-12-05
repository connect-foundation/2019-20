import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'core-js';

import cors from 'cors';
import indexRouter from './routes/index';
import naverRouter from './routes/naver';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/', indexRouter);
app.use('/naver', naverRouter);

module.exports = app;
