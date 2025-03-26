import Router from 'koa-router';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';

const authRouter = new Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);

export { authRouter };
