import { Router, Request, Response, NextFunction } from 'express';
const router = Router();


import { pool } from '../loaders/db'
import { index } from '../controllers/index_controller'

// GET | index
//|------------------------------------------------------------------------
router.get('/', index);

export default router;