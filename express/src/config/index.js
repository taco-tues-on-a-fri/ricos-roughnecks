//|  Development Notes
//|------------------------------------------------------------------------
//| 12-22-19: TODO need to configure postgres.
//| 12-22-19: TODO need to configure jwtSecret.


import dotenv from 'dotenv';

//| Set NODE_ENV to 'development' by default
//|------------------------------------------------------------------------
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("‼️ .env file not found ‼️"); 
}

export default {
  port: parseInt(process.env.PORT, 2026),
  
  //TODO databaseURL: process.env.MONGODB_URI,
  
  jwtSecret: process.env.JWT_SECRET,
  
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  }
};