//|  Development Notes
//|------------------------------------------------------------------------
//| 12-22-19: attempting to create a standalone db loader
//| 12-22-19: successfully created basic connection to db
//| 12-22-19: TODO: Add db connection console.log
//| 12-22-19: TODO: finish configuring and implement exports
//|------------------------------------------------------------------------
//| 01-04-20: Attempting to switch over to the loading configuration described in pg's documentation for express
//| 01-05-20: New configuration working. 
//| 01-05-20: TODO: change module.exports to new syntax

import { Pool } from 'pg'
import dotenv from 'dotenv'
import config from '../config'

const isProduction = process.env.NODE_ENV === 'production'
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
})

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
}





//| Original Setup
//|------------------------------------------------------------------------
// import { Pool } from 'pg'
// import dotenv from 'dotenv'
// import config from '../config'


// const isProduction = process.env.NODE_ENV === 'production'
// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

// const pool = new Pool({
//   connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//   ssl: isProduction,
// })


// module.exports = { pool }
// export default pool 