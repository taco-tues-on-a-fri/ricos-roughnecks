//|------------------------------------------------------------------------
//| TODO: integrate morgan & winston

import express from 'express'
import cors from 'cors'
import routes from '../api'
import config from '../config'

export default ({ app }) => {
// export default ({ app }: { app: express.Application }) => {

//| Health Check endpoints
//|------------------------------------------------------------------------
  app.get('/status', (req, res) => {
    res.status(200).end()
  })
  app.head('/status', (req, res) => {
    res.status(200).end()
  })


//| Shows real origin IP in the heroku or Cloudwatch logs if behind a reverse proxy 
//|------------------------------------------------------------------------
  app.enable('trust proxy')


//| Enable Cross Origin Resource Sharing to all origins by default
//|------------------------------------------------------------------------
  app.use(cors())

//| Transforms raw string of req.body into json
  app.use(express.json())

  app.use(express.urlencoded({ extended: true }))

//| Load API routes
//|------------------------------------------------------------------------
  app.use(config.api.prefix, routes());


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
      //|  include winston logging
      // winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      // winston.error(`${err.stack === undefined ? '' : err.stack}`);
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};