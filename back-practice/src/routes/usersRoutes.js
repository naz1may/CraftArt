import Router from 'koa-router';
import { getUserById, getAllUsers } from '../controllers/usersController.js';

export const userRouter = new Router();


userRouter.get('/users/:id', getUserById);


userRouter.get('/users', getAllUsers);
