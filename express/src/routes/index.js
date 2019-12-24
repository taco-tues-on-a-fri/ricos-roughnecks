import { Router, Request, Response, NextFunction } from 'express';
const router = Router();

import { pool } from '../loaders/db';
import { index } from '../controllers/index_controller';

//| GET | redirect root to /api/index
//|------------------------------------------------------------------------
router.get('/', function(req, res, next) {
  res.redirect('/api');
});

export default router;
