//|  Development Notes
//|------------------------------------------------------------------------
//| 12-22-19: TODO need to configure postgres.
//| 12-22-19: TODO need to configure jwtSecret.


import dotenv from 'dotenv';
import http from 'http'

//| Set NODE_ENV to 'development' by default
//|------------------------------------------------------------------------
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const isProduction = process.env.NODE_ENV === 'production'

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("‼️ .env file not found ‼️"); 
}

export default {
  // api: {
  //   prefix: '/api',
  // },
  
  port: process.env.PORT || '9000',

  
  // database: {
  //   isProduction: isProduction,
  //   DB_USER: process.env.DB_USER,
  //   DB_PASSWORD: process.env.DB_PASSWORD,
  //   DB_HOST: process.env.DB_HOST,
  //   DB_PORT: process.env.DB_PORT,
  //   DB_DATABASE: process.env.DB_DATABASE
  // },
  

  jwtSecret: process.env.JWT_SECRET,
  
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  }
};





// module.exports = { pool }