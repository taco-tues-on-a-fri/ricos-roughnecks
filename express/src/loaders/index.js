import expressLoader from './express';
import postgresLoader from './db';
// import mongooseLoader from './mongoose';
import Logger from './logger';

//We have to import at least all the events once so they can be triggered
// import './events';

console.log('line8: src/loaders/index.js')
export default async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};