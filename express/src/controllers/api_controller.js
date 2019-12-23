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