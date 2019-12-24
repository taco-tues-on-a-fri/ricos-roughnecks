require('express-async-errors');
import { pool } from '../loaders/db'


//| index
//|------------------------------------------------------------------------
export function index(req, res, next) {
  pool.query('SELECT * FROM person', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
};



//   export function index(req, res) {
//     res.render('index', { 
//       title: "Scraping Reddit", 
//       scrape_title: 'Create Scrape'
//     });
// };



// const addBook = (request, response) => {
//   const { author, title } = request.body

//   pool.query('INSERT INTO books (author, title) VALUES ($1, $2)', [author, title], error => {
//     if (error) {
//       throw error
//     }
//     response.status(201).json({ status: 'success', message: 'Book added.' })
//   })
// }

// router.get('/home', function(req, res, next) {
//   pool.query('SELECT * FROM person', (error, results) => {
//     if (error) {
//       throw error
//     }
//     res.status(200).json(results.rows)
//   })
// });



// app
//   .route('/books')
// GET endpoint
//   .get(getBooks)
// POST endpoint
//   .post(addBook)
