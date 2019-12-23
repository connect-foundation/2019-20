import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import db from './db';

// import 'core-js';
const indexRouter = require('./routes/index');

db().catch((err) => {
  console.log(err);
});

const app = express();
app.use(
  cors({
    origin: process.env.clientHost,
    methods: 'GET,POST,DELETE',
    credentials: true,
    preflightContinue: true,
  }),
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

module.exports = app;
