import express from 'express'
const router  =  express.Router();

// const express =  require('express');
// const appRoot =  require('app-root-path');


const index_controller   =  require(appRoot + '/controllers/index_controller');

// GET | index
//|------------------------------------------------------------------------
router.get('/', index_controller.index);

// module.exports = router;
export default router