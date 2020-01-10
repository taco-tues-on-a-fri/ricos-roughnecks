//| 01-05-20: Dynamic general query of for the 3 main tables built
//| 01-07-20: POST is being seen by Express, but request body is empty
//| 01-10-20: POST v.06 create ticket works as intended.  
//| 01-10-20: Middleware was out of order for express.json & urlencoded
//|------------------------------------------------------------------------

import { Request, Response, NextFunction } from 'express';
import Router from 'express-promise-router'
import db from '../loaders/db'
// import pool from '../loaders/db'
const router = new Router()
import queryString from 'query-string'
import util from 'util'

//| TODO: phase this controller out.
import { index, query_person, query_ticket_project, query_ticket, create_ticket_get, create_ticket_post} from '../controllers/api_controller';


//| GET | index
//|------------------------------------------------------------------------
router.get('/', index);


//| GET | Select all rows from specified table through params
//|------------------------------------------------------------------------
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const {rows } = await db.query(`SELECT * FROM ${id}`)
  res.json(rows)
});


//| POST | v.06 create new ticket
//|------------------------------------------------------------------------
router.post('/ticket', async (req, res) => {
  const values = Object.values(req.body)
  const text = 'INSERT INTO ticket(ticket_name, ticket_type, ticket_description, ticket_project, assigned_developer, ticket_priority, ticket_status) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
  try {
    const res = await db.query(text, values)
    console.log(res.rows[0])
  } catch (err) {
    console.log(err.stack)
  }
});


export default router