//| 01-04-20: Switched to the loading config described in node-postgres' express documentation
//| 01-05-20: Dynamic general query of for the 3 main tables built
//| 01-07-20: Saved build version 1.02 and reverting back to 1.01 after using
//| 01-07-20:    {method: 'POST'} that introduced crashes
//|------------------------------------------------------------------------
//| 01-07-20: Post is now working, and all the table column names are correct
//| 01-07-20: There is a problem with the construction of the insert query function
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

//| POST | v.01 post new ticket
//|------------------------------------------------------------------------
// router.post('/ticket', async (req, res) => {
//   console.log(util.inspect(queryString.parse(req.params.search)))
//   const { 
//     ticket_name,
//     ticket_type,
//     ticket_description,
//     ticket_project,
//     assigned_developer,
//     ticket_priority,
//     ticket_status
//   } = queryString.parse(req.params.search)
//   // const { rows } = await db.query(`INSERT INTO ticket(ticket_name, ticket_type, ticket_description, ticket_project, assigned_developer, ticket_priority, ticket_status) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`
//   const { rows } = await db.query(`INSERT INTO ticket(ticket_name, ticket_type, ticket_description, ticket_project, assigned_developer, ticket_priority, ticket_status) VALUES(${ticket_name, ticket_type, ticket_description, ticket_project, assigned_developer, ticket_priority, ticket_status}) RETURNING *`)
//   .then(res => res.json(rows))
//   .catch(err => console.error('error executing query', err.stack))
//   // res.json(rows)
// });


router.post('/ticket', async (req, res) => {
  // console.log('req:')
  // console.log(util.inspect(req))
  // console.log('req.params:')
  // console.log(util.inspect(req.params))
  console.log('req.body:')
  console.log(util.inspect(req.body))
  const text = 'INSERT INTO ticket(ticket_name, ticket_type, ticket_description, ticket_project, assigned_developer, ticket_priority, ticket_status) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
  const values = Object.values(queryString.parse(req.body.search))
  console.log(util.inspect(values))
  try {
    const res = await db.query(text, values)
    console.log(res.rows[0])
  } catch (err) {
    console.log(err.stack)
  }
  

})



export default router




//| POST | v.02 post new ticket
//|------------------------------------------------------------------------
// router.post('/ticket/:id', async (req, res) => {
//   console.log(queryString.parse(req.params.search))
  
//   const { 
//     ticket_name,
//     ticket_type,
//     ticket_description,
//     ticket_project,
//     assigned_developer,
//     ticket_priority,
//     ticket_status
//   } = queryString.parse(req.params.search)
//   const values = [`${ticket_name, ticket_type, ticket_description, ticket_project, assigned_developer, ticket_priority, ticket_status}`]
//   const { rows } = await db.query(`INSERT INTO ticket(ticket_name, ticket_type, ticket_description, ticket_project, assigned_developer, ticket_priority, ticket_status) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`)
//   // const { rows } = await db.query(`INSERT INTO ticket(ticket_name, ticket_type, ticket_description, ticket_project, assigned_developer, ticket_priority, ticket_status) VALUES(${ticket_name, ticket_type, ticket_description, ticket_project, assigned_developer, ticket_priority, ticket_status}) RETURNING *`)
//   .then(res => res.json(rows))
//   .catch(err => console.error('error executing query', err.stack))
//   // res.json(rows)
// });