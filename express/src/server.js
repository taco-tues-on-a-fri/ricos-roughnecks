import express from 'express';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';
// import cookieParser from 'cookie-parser';

import { pool } from './config/index'


import router from './routes/index'
// import indexRouter from './routes/index';


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));
app.use('/', router);



export default app;


