import ProductService from '../services/products.js';

export const getAllProducts = async (ctx) => {
    try {
        const products = await ProductService.getAllProducts();
        ctx.body = { products };
        ctx.status = 200;
    } catch (error) {
        console.error(error);
        ctx.body = { error: 'Error fetching products' };
        ctx.status = 500;
    }
};

export const getProduct = async (ctx) => {
    try {
        const product = await ProductService.getProduct(ctx.params.id);
        if (!product) {
            ctx.status = 404;
            ctx.body = { error: 'Product not found' };
        } else {
            ctx.status = 200;
            ctx.body = { product };
        }
    } catch (error) {
        console.error(error);
        ctx.body = { error: 'Error fetching product' };
        ctx.status = 500;
    }
};
