//| Development notes
//|------------------------------------------------------------------------
//| 12-22-19: Reverting back to normal express structure
//| 12-22-19: File is back to working state.
//| 12-22-19: morgan w/ winston logging is complete
//| 12-23-19: changing server port to 9000
//| 12-23-19: TODO: need to change express.static to handle the dist folder
//| 12-23-19: TODO:     how are .env variables handled?



import express from 'express';
import path from 'path';
import createError from 'http-errors'
import morgan from 'morgan';
import cors from 'cors';
import Logger from './loaders/logger';
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import { body, check } from 'express-validator'
import util from 'util'
// import cookieParser from 'cookie-parser';


//| setup postgres
//|------------------------------------------------------------------------
import { pool } from './config/index'


//| setup routes
//|------------------------------------------------------------------------
import index_router from './routes/index'
import api_router from './routes/api'

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
app.use(cors()) //TODO configure for production - see area at bottom
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));
app.use(compression())
app.use(helmet())


//| setup rate limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // 5 requests,
})

app.use(limiter)


//| define routes
//|------------------------------------------------------------------------
app.use('/', index_router);
app.use('/api', api_router);

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

//| TODO Area
//|------------------------------------------------------------------------
//| integrate this cors configuration for production

// const isProduction = process.env.NODE_ENV === 'production'
// const origin = {
//   origin: isProduction ? 'https://www.example.com' : '*',
// }

// app.use(cors(origin))

//| 
//|------------------------------------------------------------------------