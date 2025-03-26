import Router from 'koa-router';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favController.js';

const favRouter = new Router();

favRouter.get('/favorites/:userId', getFavorites);

favRouter.post('/favorites/:userId/:productId', addFavorite);

favRouter.delete('/favorites/:userId/:productId', removeFavorite);

export { favRouter };
