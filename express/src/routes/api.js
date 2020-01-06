//| 01-04-20: Switched to the loading config described in node-postgres' express documentation
//| 01-05-20: Dynamic general query of for the 3 main tables built
//|------------------------------------------------------------------------

import { Request, Response, NextFunction } from 'express';
import Router from 'express-promise-router'
import db from '../loaders/db'
const router = new Router()
import queryString from 'query-string'

//| TODO: phase this controller out.
import { index, query_person, query_project, query_ticket, create_ticket_get, create_ticket_post} from '../controllers/api_controller';


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

//| POST | post new ticket
//|------------------------------------------------------------------------
router.post('ticket/:id', async (req, res) => {
  const { 
    ticketName,
    ticketType,
    ticketDescription,
    project,
    developer,
    ticketPriority,
    ticketStatus
  } = queryString.parse(req.params.search)
  // const { rows } = await db.query(`INSERT INTO ticket(ticketName, ticketType, ticketDescription, project, developer, ticketPriority, ticketStatus) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`
  const { rows } = await db.query(`INSERT INTO ticket(ticketName, ticketType, ticketDescription, project, developer, ticketPriority, ticketStatus) VALUES(${ticketName, ticketType, ticketDescription, project, developer, ticketPriority, ticketStatus}) RETURNING *`)
  res.json(rows)
});


export default router





// router.get('/:id', async (req, res) => {
//   const { id } = req.params
//   const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id])
//   res.send(rows[0])
// })








//| Refactored after dynamic query function built, old code that was replaced below
//|------------------------------------------------------------------------

// router.get('/person', query_person);
// router.get('/project', query_project);
// router.get('/ticket', query_ticket);




//| 
//|------------------------------------------------------------------------
//|------------------------------------------------------------------------





//| Original Setup
//|------------------------------------------------------------------------
// import { Request, Response, NextFunction } from 'express';

// const router = Router();


// import { pool } from '../loaders/db';
// import { index, query_person, query_project, query_ticket, create_ticket_get, create_ticket_post} from '../controllers/api_controller';

// //| GET | index
// //|------------------------------------------------------------------------
// router.get('/', index);

// router.get('/person', query_person);
// router.get('/project', query_project);
// router.get('/ticket', query_ticket);

// router.get('/ticket/create', create_ticket_form);
// router.post('/ticket/create', create_ticket_post);

// export default router;