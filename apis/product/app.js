import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import indexRouter from './routes/index';
import productRouter from './routes/product';
import infoRouter from './routes/info';
import secretRouter from './routes/secret';
import etagGenerator from './routes/middleware/etag-generator';
import { dbConnect } from './config';

const app = express();

app.use(dbConnect());

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get('*', etagGenerator);

app.use('/', indexRouter);
app.use('/info', infoRouter);
app.use('/products', productRouter);
app.use('/secrets', secretRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.message);
});

module.exports = app;
