import { Router, Request, Response, NextFunction } from 'express';
const router = Router();

import { index } from '../controllers/index_controller';

//| GET | redirect root to /api/index
//|------------------------------------------------------------------------
router.get('/', function(req, res, next) {
  res.redirect('/api');
});

export default router;
