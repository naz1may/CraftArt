import * as crypto from 'node:crypto';
import { getKnex } from '../knex.js'; //knex это оберка над pg, sql/ помощник собрать какой-то запрос
import Router from 'koa-router';
import Joi from 'joi';
import bcrypt from 'bcrypt';

const authRouter = new Router();

authRouter.post('/register', async (ctx) => {
    // const { name, email, password } = ctx.request.body;

    // if (!name || !email || !password) {
    //     ctx.body = { error: 'Name, email, and password are required' };
    //     ctx.status = 400; // Bad request
    //     return;
    // }

    // const existingUser = await knex('users').where({email}).first();

    // if(existingUser) {
    //     ctx.body = { error: 'User with this email already exists'};
    //     ctx.status=400;
    // } else {
    //     try {
    //         const newUser = await knex('users').insert({
    //             name,
    //             email,
    //             password,
    //         }).returning('*');

    //         ctx.body = { user: newUser[0]};
    //         ctx.status = 201;
    //     } catch (error) {
    //         console.log(error);
    //         ctx.body = { error: 'Error creating user'};
    //         ctx.status = 500;
    //     }
    // } //рабочий код регистрация, вернуть при необходимости

    //!

    console.log('post request to /users', ctx.request.body);
    const joiSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const {name, email, password} = await joiSchema.validateAsync(ctx.request.body);

    const passwordHash = await bcrypt.hash(password, 12);

    const knex = await getKnex();

    const dbUser = await knex('users').insert({
        name,
        email,
        password: passwordHash,
    }).returning('*');

    //console.log(value);

    //ctx.body = {};
    ctx.body = { dbUser };
    ctx.status = 201;
});

authRouter.post('/login', async (ctx) => {
    // const { email, password } = ctx.request.body;

    // const user = await knex('users').where({email}).first();

    // if(!user) {
    //     ctx.body = { error: 'User not found' };
    //     ctx.status = 404;
    // } else {
    //     if(user.password === password) {
    //         ctx.body = { message: 'Login successful', userId: user.id };
    //         ctx.status = 200;
    //     } else {
    //         ctx.body = { error: 'Incorrect password' };
    //         ctx.status = 401;
    //     }
    // } //рабочий код логин, вернуть при необходимости

    //!

    const joiSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(), 
        password: Joi.string().required(),
    });

    const { name, email, password} = await joiSchema.validateAsync(ctx.request.body);

    const knex = await getKnex();
    const dbUser = await knex('users').where({ email }).first();

    if(!dbUser) {
        throw new Error('USER_NOT_FOUND');
    }

    const match = await bcrypt.compare(password, dbUser.password);

    console.log({ match });

    if ( !match ){
        //ctx.status = 400;
        //ctx.body = { message: 'login or password is incorrect'};

        throw new Error( 'login or password is incorrect' )

        //return;
    }

    const token = crypto.randomBytes(20).toString('hex');

    await knex('tokens').insert({
        user_id: dbUser.id,
        token,
    });

    ctx.status = 200;
    ctx.body = { ok: true };
});

authRouter.post('/logout', async (ctx) => {

});

export { authRouter };
