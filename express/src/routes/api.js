//| 01-04-20: Attempting to switch over to the loading configuration described in pg's documentation for express
//| 01-04-20: building out dynamic query on ticket path
//| 01-04-20:   decided to try and make a dynamic general query of any of the 3 tables
//| 01-04-20:    using only 1 dynamic function


//|------------------------------------------------------------------------
import { Request, Response, NextFunction } from 'express';
import Router from 'express-promise-router'
import db from '../loaders/db'
import { index, query_person, query_project, query_ticket, create_ticket_get, create_ticket_post} from '../controllers/api_controller';
const router = new Router()

//| GET | index
//|------------------------------------------------------------------------
router.get('/', index);

// router.get('/person', query_person);
// router.get('/project', query_project);
// router.get('/ticket', query_ticket);

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const {rows } = await db.query(`SELECT * FROM ${id}`)
  // res.send(rows[0])
  // res.status(200).json(rows)
  res.json(rows)
});


// router.get('/:id', async (req, res) => {
//   const { id } = req.params
//   const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id])
//   res.send(rows[0])
// })

export default router





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