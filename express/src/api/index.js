import { Router } from 'express';
// import auth from './routes/auth';
// import user from './routes/user';
import home from './routes/home';

export default () => {
  const app = Router();
  index(app);
	auth(app);
	user(app);

	return app
}