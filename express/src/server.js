//| Development notes
//|------------------------------------------------------------------------
//| 12-22-19: Reverting back to normal express structure
//| 12-22-19: File is back to working state.
//| 12-22-19: morgan w/ winston logging is complete
//| 12-23-19: changing server port to 9000



import express from 'express';
import path from 'path';
import createError from 'http-errors'
import morgan from 'morgan';
import cors from 'cors';
import Logger from './loaders/logger';
// import cookieParser from 'cookie-parser';


//| setup postgres
//|------------------------------------------------------------------------
import { pool } from './config/index'


//| setup routes
//|------------------------------------------------------------------------
import router from './routes/index'

//| instantiate express
//|------------------------------------------------------------------------
const app = express();


//| setup morgan w/ winston logging
//|------------------------------------------------------------------------
app.use(morgan('dev', { 
  stream: {
    write: (message) => Logger.info(message)
  }
}));


//| define middleware
//|------------------------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));


//| define routes
//|------------------------------------------------------------------------
app.use('/', router);

app.get('/status', (req, res) => {
  res.status(200).end()
})
app.head('/status', (req, res) => {
  res.status(200).end()
})



//| catch 404 and forward to error handler
//|------------------------------------------------------------------------

//| catch 404
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

//| handle 401 thrown by express-jwt library
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res
      .status(err.status)
      .send({ message: err.message })
      .end();
  }
  return next(err);
});

//| handle all other errors
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


