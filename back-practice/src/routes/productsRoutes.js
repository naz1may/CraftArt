import Router from 'koa-router';
import { getAllProducts, getProduct } from '../controllers/productsController.js';

const router = new Router();

router.get('/products', getAllProducts);

router.get('/products/:id', getProduct);

export default router;
