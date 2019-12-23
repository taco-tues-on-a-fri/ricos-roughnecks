//|  Development Notes
//|------------------------------------------------------------------------
//| 12-22-19: attempting to create a standalone db loader
//| 12-22-19: successfully created basic connection to db
//| 12-22-19: TODO: Add db connection console.log
//| 12-22-19: TODO: finish configuring and implement exports




import { Pool } from 'pg'
import dotenv from 'dotenv'
import config from '../config'


const isProduction = process.env.NODE_ENV === 'production'
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
})


module.exports = { pool }
// export default pool 