// import { Pool, Client } from 'pg'

// config = {
//   user?: process.env.DB_USER,
//   password?: process.env.DB_PASS,
//   database?: process.env.DB_NAME,
//   port?: process.env.DB_PORT,
//   connectionString?: string // e.g. postgres://user:password@host:5432/database
// }


// const pool = new Pool()

// module.exports = {
//   query: (text, params, callback) => {
//     return pool.query(text, params, callback)
//   },
// }

import { Client } from 'pg'
const client = new Client()




module.exports = {
  client.connect()
}