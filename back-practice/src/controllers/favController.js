import FavService from '../services/fav.js';

export const getFavorites = async (ctx) => {
    try {
        const { userId } = ctx.params;
        const favorites = await FavService.getFavorites(userId);
        if (favorites.length === 0) {
            ctx.status = 404;
            ctx.body = { error: 'No favorite products found for this user' };
        } else {
            ctx.status = 200;
            ctx.body = { favorites };
        }
    } catch (error) {
        console.log(error);
        ctx.body = { error: 'Error fetching favorite products' };
        ctx.status = 500;
    }
};

export const addFavorite = async (ctx) => {
    try {
        const { userId, productId } = ctx.params;
        const result = await FavService.addFavorite(userId, productId);
        if (result) {
            ctx.status = 200;
            ctx.body = { message: 'Product successfully added to favorites' };
        } else {
            ctx.status = 400;
            ctx.body = { error: 'Product is already in the favorites' };
        }
    } catch (error) {
        console.log(error);
        ctx.body = { error: 'Error adding product to favorites' };
        ctx.status = 500;
    }
};

export const removeFavorite = async (ctx) => {
    try {
        const { userId, productId } = ctx.params;
        const result = await FavService.removeFavorite(userId, productId);
        if (result) {
            ctx.status = 200;
            ctx.body = { message: 'Product successfully removed from favorites' };
        } else {
            ctx.status = 404;
            ctx.body = { error: 'Product not found in user favorites' };
        }
    } catch (error) {
        console.log(error);
        ctx.body = { error: 'Error removing product from favorites' };
        ctx.status = 500;
    }
};
