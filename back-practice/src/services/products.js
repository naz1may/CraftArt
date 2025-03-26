import { getKnex } from '../utils/knex.js';

class ProductService {
    static async getAllProducts() {
        const knex = await getKnex();
        try {
            return await knex('products');
        } catch (error) {
            throw new Error('Error fetching products from DB');
        }
    }

    static async getProduct(id) {
        const knex = await getKnex();
        try {
            return await knex('products').where({ id }).first();
        } catch (error) {
            throw new Error('Error fetching product from DB');
        }
    }
}

export default ProductService;