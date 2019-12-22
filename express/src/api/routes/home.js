import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
// import { IUserInputDTO } from '../../interfaces/IUser';
import middlewares from '../middlewares';
// import { celebrate, Joi } from 'celebrate';

const route = Router();

export default (app: Router) => {
  app.use('/', route);

  route.post(
    '/home',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger');
      logger.debug('Calling home endpoint with body: %o', req.body )
      try {
        const test_content = {
          title: 'I love titles',
          thing: 'the thing',
          cats: 'cats are creepy'
        }
        return res.status(201).json({ test_content });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};