require('express-async-errors');

//| index
//|------------------------------------------------------------------------
export function index(req, res) {
// exports.index = function(req, res) {
    res.render('index', { 
      title: "Scraping Reddit", 
      scrape_title: 'Create Scrape'
    });
};

