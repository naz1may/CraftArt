import UserService from '../services/users.js';

export const getUserById = async (ctx) => {
    try {
        const user = await UserService.getUserById(ctx.params.id);
        if (!user) {
            ctx.status = 404;
            ctx.body = { message: 'User not found' };
            return;
        }
        ctx.status = 200;
        ctx.body = { user };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { message: 'Internal server error' };
    }
};

export const getAllUsers = async (ctx) => {
    try {
        const users = await UserService.getAllUsers();
        ctx.status = 200;
        ctx.body = { users };
    } catch (error) {
        console.error(error); //! Логирование ошибки 
        ctx.status = 500;
        ctx.body = { message: 'Internal server error' };
    }
};
