import { Router, Request, Response, NextFunction } from 'express';
const router = Router();


import { pool } from '../loaders/db';
import { index, query_person, query_project, query_ticket } from '../controllers/api_controller';

//| GET | index
//|------------------------------------------------------------------------
router.get('/', index);

router.get('/person', query_person);
router.get('/project', query_project);
router.get('/ticket', query_ticket);

export default router;