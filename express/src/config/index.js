//|  Development Notes
//|------------------------------------------------------------------------
//| 12-22-19: TODO need to configure postgres.
//| 12-22-19: TODO need to configure jwtSecret.


import dotenv from 'dotenv';
import { Pool } from 'pg';


//| Set NODE_ENV to 'development' by default
//|------------------------------------------------------------------------
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const isProduction = process.env.NODE_ENV === 'production'



const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("‼️ .env file not found ‼️"); 
}

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
})
module.exports = { pool }
// export default {
//   port: parseInt(process.env.PORT, 2026),
  
//   // databaseURL: process.env.MONGODB_URI,
//   pool: pool,

//   jwtSecret: process.env.JWT_SECRET,
  
//   logs: {
//     level: process.env.LOG_LEVEL || 'silly',
//   }
// };





// module.exports = { pool }