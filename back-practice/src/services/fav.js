import { getKnex } from '../utils/knex.js';

class FavService {
    static async getFavorites(userId) {
        const knex = await getKnex();
        try {
            return await knex('favorites')
                .join('products', 'favorites.product_id', '=', 'products.id')
                .where('favorites.user_id', userId)
                .select('products.*');
        } catch (error) {
            console.error('Error fetching favorites from DB:', error);
            throw new Error('Error fetching favorites from DB');
        }
    }


    static async addFavorite(userId, productId) {
        const knex = await getKnex();
        try {
            const existingFavorite = await knex('favorites')
                .where({ user_id: userId, product_id: productId })
                .first();

            if (existingFavorite) {
                return false;
            }

            await knex('favorites').insert({ user_id: userId, product_id: productId });
            return true;
        } catch (error) {
            console.error('Error adding to favorites in DB:', error);
            throw new Error('Error adding to favorites in DB');
        }
    }

    static async removeFavorite(userId, productId) {
        const knex = await getKnex();
        try {
            const result = await knex('favorites')
                .where({ user_id: userId, product_id: productId })
                .del();

            return result > 0;
        } catch (error) {
            console.error('Error removing from favorites in DB:', error);
            throw new Error('Error removing from favorites in DB');
        }
    }
}

export default FavService;
