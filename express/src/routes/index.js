// import { Router, Request, Response, NextFunction, redirect } from 'express';
import express from 'express';
const router = express.Router();

import { pool } from '../loaders/db'
import { index } from '../controllers/index_controller'

// GET | index
//|------------------------------------------------------------------------
// router.get('/home', index);
router.get('/', function(req, res, next) {
  console.log(req.body)
  res.redirect('/api');
});

// router.get('/home', function(req, res, next) {
//   pool.query('SELECT * FROM person', (error, results) => {
//     if (error) {
//       throw error
//     }
//     res.status(200).json(results.rows)
//   })
// });


export default router;


// const addBook = (request, response) => {
//   const { author, title } = request.body

//   pool.query('INSERT INTO books (author, title) VALUES ($1, $2)', [author, title], error => {
//     if (error) {
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'Book added.' })
//   })
// }

// app
//   .route('/books')
//   // GET endpoint
//   .get(getBooks)
//   // POST endpoint
//   .post(addBook)
