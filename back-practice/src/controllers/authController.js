import Joi from 'joi';
import AuthService from '../services/auth.js';

export const registerUser = async (ctx) => {
    try {
        const joiSchema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });

        const { name, email, password } = await joiSchema.validateAsync(ctx.request.body);

        const dbUser = await AuthService.registerUser(name, email, password);

        ctx.body = { dbUser };
        ctx.status = 201;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { message: error.message };
    }
};

export const loginUser = async (ctx) => {
    try {
        const joiSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });

        const { email, password } = await joiSchema.validateAsync(ctx.request.body);

        const token = await AuthService.loginUser(email, password);

        ctx.status = 200;
        ctx.body = { token };
    } catch (error) {
        ctx.status = 400;
        ctx.body = { message: error.message };
    }
};

export const logoutUser = async (ctx) => {
    try {
        const joiSchema = Joi.object({
            token: Joi.string().required(),
        });

        const { token } = await joiSchema.validateAsync(ctx.request.body);

        await AuthService.logoutUser(token);

        ctx.status = 200;
        ctx.body = { message: 'Logout completed' };
    } catch (error) {
        ctx.status = 400;
        ctx.body = { message: error.message };
    }
};
