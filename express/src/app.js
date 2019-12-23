//|  Development Notes
//|------------------------------------------------------------------------
//| 12-22-19: TODO - after initial setup- configure to use babel instead of boilerplate workaround
//| 12-22-19: TODO - change server listening console log from boiler plate
//| 12-22-19: Working commit
//| 12-22-19: begin removing bin/www.js and making this entry point

//|------------------------------------------------------------------------
import config from './config'
import express from 'express'
import chalk from 'chalk'

import Logger from './loaders/logger'
// import 'reflect-metadata'; // We need this in order to use @Decorators

//| TODO: integrate or delete
//|------------------------------------------------------------------------
// import debugLib from 'debug'
// const debug =  debugLib('ricos-roughnecks-api:server');
import http from 'http'
//|------------------------------------------------------------------------


async function startServer() {
  const app = express();



  app.listen(config.port, err => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
  });
}

startServer();