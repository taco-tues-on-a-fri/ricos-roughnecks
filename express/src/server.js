//| Development notes
//|------------------------------------------------------------------------
//| 12-22-19: Reverting back to normal express structure
//| 12-22-19: File is back to working state.


import express from 'express';
import path from 'path';
import createError from 'http-errors'
import morgan from 'morgan';
import cors from 'cors';
import Logger from './loaders/logger';
// import cookieParser from 'cookie-parser';

import { pool } from './config/index'


import router from './routes/index'
// import indexRouter from './routes/index';


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));
app.use('/', router);

app.get('/status', (req, res) => {
  res.status(200).end()
})
app.head('/status', (req, res) => {
  res.status(200).end()
})

  //| Catch 404 and forward to error handler
//|------------------------------------------------------------------------

//| Catch 404
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

//| Handle 401 thrown by express-jwt library
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res
      .status(err.status)
      .send({ message: err.message })
      .end();
  }
  return next(err);
});

app.use((err, req, res, next) => {

  //| include winston logging
  Logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  Logger.error(`${err.stack === undefined ? '' : err.stack}`);

  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
    },
  });
});




export default app;


