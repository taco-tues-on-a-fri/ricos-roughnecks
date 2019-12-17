import { Pool } from 'pg'

const pool = new Pool()

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}