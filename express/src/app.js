//|  Development Notes
//|------------------------------------------------------------------------
//| 12-22-19: TODO - after initial setup- configure to use babel instead of boilerplate workaround
//| 12-22-19: TODO - change server listening console log from boiler plate
//| 12-22-19: Working commit



// import 'reflect-metadata'; // We need this in order to use @Decorators

import config from './config';
console.log('line11: src/app.js')
import express from 'express';
console.log('line13: src/app.js')

import Logger from './loaders/logger';
console.log('line16: src/app.js')

async function startServer() {
  console.log('line19: src/app.js')
  const app = express();
  console.log('line21: src/app.js')
  
  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
  // await require('./loaders').default({ expressApp: app });
  console.log('line: src/app.js')

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