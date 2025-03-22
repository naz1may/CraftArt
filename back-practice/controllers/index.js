// import http from 'http';
// import pg from 'pg';
import * as crypto from 'node:crypto';
import Koa from 'koa';
//import Router from '../koa-router';
import bodyparser from 'koa-bodyparser';
import { getKnex } from '../knex.js'; //knex это оберка над pg, sql/ помощник собрать какой-то запрос

import { userRouter } from './users.js';


import Router from 'koa-router';
import { getUserById } from '../services/users.js'; // Импортируем сервис

import Joi from 'joi';
import bcrypt from 'bcrypt';

//import { products } from './catalog.js';

export * from './auth.js';

const products = [

    // Painting
    { id: 4, name: 'Paint Set', description: 'Professional paint set', img: "/img/products/paint-set.jpg", category: 'painting' },
    { id: 5, name: 'Canvas', description: 'High-quality canvas', img: "/img/products/Canvas.jpg", category: 'painting' },
    { id: 6, name: 'Brushes', description: 'Variety of paint brushes', img: "/img/products/Brushes.jpg", category: 'painting' },

    // Handicrafts
    { id: 7, name: 'Yarn', description: 'Soft yarn for knitting', img: "/img/products/Yarn.jpg", category: 'handicrafts' },
    { id: 8, name: 'Needles', description: 'Knitting needles set', img: "/img/products/Needles.jpg", category: 'handicrafts' },
    { id: 9, name: 'Pattern Book', description: 'Knitting patterns book', img: "/img/products/Pattern Book.jpg", category: 'handicrafts' },

    // Modeling
    { id: 10, name: 'Model Kit', description: 'Plastic model kit', img: "/img/products/Model Kit.jpg", category: 'modeling' },
    { id: 11, name: 'Glue', description: 'Modeling glue', img: "/img/products/Glue.jpg", category: 'modeling' },
    { id: 12, name: 'Paints', description: 'Acrylic paints for models', img: "/img/products/Paints.jpg", category: 'modeling' },

    // Sculpture
    { id: 13, name: 'Clay', description: 'Sculpting clay', img: "/img/products/Clay.jpg", category: 'sculpture' },
    { id: 14, name: 'Tools', description: 'Sculpting tools set', img: "/img/products/Tools.jpg", category: 'sculpture' },
    { id: 15, name: 'Stand', description: 'Sculpture stand', img: "/img/products/Stand.jpg", category: 'sculpture' },

    // Books
    { id: 16, name: 'Art Book', description: 'Art history book', img: "/img/products/Art Book.jpg", category: 'books' },
    { id: 17, name: 'Craft Book', description: 'Crafting techniques book', img: "/img/products/Craft Book.jpg", category: 'books' },
    { id: 18, name: 'Design Book', description: 'Graphic design book', img: "/img/products/Design Book.jpg", category: 'books' },

    // Stationery
    { id: 19, name: 'Notebook', description: 'Sketch notebook', img: "/img/products/Notebook.jpg", category: 'stationery' },
    { id: 20, name: 'Pens', description: 'Set of drawing pens', img: "/img/products/Pens.jpg", category: 'stationery' },
    { id: 21, name: 'Markers', description: 'Art markers set', img: "/img/products/Markers.jpg", category: 'stationery' },

    // Accessories
    { id: 22, name: 'Easel', description: 'Portable easel', img: "/img/products/Easel.jpg", category: 'accessories' },
    { id: 23, name: 'Palette', description: 'Painting palette', img: "/img/products/Palette.jpg", category: 'accessories' },
    { id: 24, name: 'Apron', description: 'Artist apron', img: "/img/products/Artist apron.jpg", category: 'accessories' },

    // Something
    { id: 25, name: 'Mystery Box', description: 'Mystery craft box', img: "/img/products/Mystery Box.jpg", category: 'something' },
    { id: 26, name: 'DIY Kit', description: 'DIY craft kit', img: "/img/products/DIY Kit.jpg", category: 'something' },
    { id: 27, name: 'Craft Supplies', description: 'Assorted craft supplies', img: "/img/products/Craft Supplies.jpg", category: 'something' },
];

export const router = new Router();

const knex = await getKnex();

const delay = (ms) =>
    new Promise((res) => setTimeout(res, ms));

// router.post('/register', async (ctx) => {
//     // const { name, email, password } = ctx.request.body;

//     // if (!name || !email || !password) {
//     //     ctx.body = { error: 'Name, email, and password are required' };
//     //     ctx.status = 400; // Bad request
//     //     return;
//     // }

//     // const existingUser = await knex('users').where({email}).first();

//     // if(existingUser) {
//     //     ctx.body = { error: 'User with this email already exists'};
//     //     ctx.status=400;
//     // } else {
//     //     try {
//     //         const newUser = await knex('users').insert({
//     //             name,
//     //             email,
//     //             password,
//     //         }).returning('*');

//     //         ctx.body = { user: newUser[0]};
//     //         ctx.status = 201;
//     //     } catch (error) {
//     //         console.log(error);
//     //         ctx.body = { error: 'Error creating user'};
//     //         ctx.status = 500;
//     //     }
//     // } //рабочий код регистрация, вернуть при необходимости

//     //!

//     console.log('post request to /users', ctx.request.body);
//     const joiSchema = Joi.object({
//         name: Joi.string().required(),
//         email: Joi.string().email().required(),
//         password: Joi.string().required(),
//     });

//     const {name, email, password} = await joiSchema.validateAsync(ctx.request.body);

//     const passwordHash = await bcrypt.hash(password, 12);

//     const knex = await getKnex();

//     const dbUser = await knex('users').insert({
//         name,
//         email,
//         password: passwordHash,
//     }).returning('*');

//     //console.log(value);

//     //ctx.body = {};
//     ctx.body = { dbUser };
//     ctx.status = 201;
// });

// router.post('/login', async (ctx) => {
//     // const { email, password } = ctx.request.body;

//     // const user = await knex('users').where({email}).first();

//     // if(!user) {
//     //     ctx.body = { error: 'User not found' };
//     //     ctx.status = 404;
//     // } else {
//     //     if(user.password === password) {
//     //         ctx.body = { message: 'Login successful', userId: user.id };
//     //         ctx.status = 200;
//     //     } else {
//     //         ctx.body = { error: 'Incorrect password' };
//     //         ctx.status = 401;
//     //     }
//     // } //рабочий код логин, вернуть при необходимости

//     //!

//     const joiSchema = Joi.object({
//         name: Joi.string().required(),
//         email: Joi.string().email().required(), 
//         password: Joi.string().required(),
//     });

//     const { name, email, password} = await joiSchema.validateAsync(ctx.request.body);

//     const knex = await getKnex();
//     const dbUser = await knex('users').where({ email }).first();

//     if(!dbUser) {
//         throw new Error('USER_NOT_FOUND');
//     }

//     const match = await bcrypt.compare(password, dbUser.password);

//     console.log({ match });

//     if ( !match ){
//         //ctx.status = 400;
//         //ctx.body = { message: 'login or password is incorrect'};

//         throw new Error( 'login or password is incorrect' )

//         //return;
//     }

//     const token = crypto.randomBytes(20).toString('hex');

//     await knex('tokens').insert({
//         user_id: dbUser.id,
//         token,
//     });

//     ctx.status = 200;
//     ctx.body = { ok: true };
// });

// router.post('/logout', async (ctx) => {

// });

//получение всех пользователей
router.get('/users', async (ctx) => {
    // try {
    //     const users = await knex('users').select('*');
    //     ctx.body = { users };
    //     ctx.status = 200;
    // } catch (error) {
    //     console.log(error);
    //     ctx.body = { error: 'Error fetching users' };
    //     ctx.status = 500;
    // }

    // //throw new Error('some error');

    const knex = await getKnex();

    const users = await knex('users');
    ctx.body = { users };
    ctx.status = 200;

    //throw new Error('some error');
});

//!получение пользователя по id
// router.get('/users/:id', async (ctx) => {
//     const { id } = ctx.params;
//     try {
//         const user = await knex('users').where({id}).first();
//         if(!user) {
//             ctx.body = { error: 'User not found' };
//             ctx.status = 404;
//         } else {
//             ctx.body = { user };
//             ctx.status = 200;
//         }
//     } catch (error) {
//         console.log(error);
//         ctx.body = { error: 'Error fetching user' };
//         ctx.status = 500;
//     }
// });

// router.get('/users', async (ctx) => {
//     await delay(1000);
//     ctx.body = { ok: true };
//     ctx.status = 200;
// });

// router.get(`/users/:id`, async (ctx) => {
//     const knex = await getKnex();
//     const user = await knex('users')
//     .where({ id: ctx.params.id })
//     .first();

//     //!ctx.body = { userId: ctx.params.id };
//     ctx.body = {
//         user,
//     };
//     ctx.status = 200;
// })

// router.post('/users', async (ctx) => {
//     console.log('post request to /users', ctx.request.body);

//     //!await knex('users').insert(); //поэксперементировать

//     ctx.body={};
//     ctx.status=201; //created
// });


// Получение всех товаров
router.get('/products', async (ctx) => {
    try {
        // Здесь мы просто возвращаем список товаров из массива
        ctx.body = { products };
        ctx.status = 200;
    } catch (error) {
        console.log(error);
        ctx.body = { error: 'Error fetching products' };
        ctx.status = 500;
    }
});

//!

// Добавление товара в избранное
router.post('/favorites', async (ctx) => {
    const { user_id, product_id } = ctx.request.body;

    // Проверка на наличие user_id и product_id
    if (!user_id || !product_id) {
        ctx.body = { error: 'User ID and Product ID are required' };
        ctx.status = 400;
        return;
    }

    try {
        // Проверка, что товар не добавлен в избранное
        const existingFavorite = await knex('favorites')
            .where({ user_id, product_id })
            .first();

        if (existingFavorite) {
            ctx.body = { message: 'Product is already in favorites' };
            ctx.status = 200;
            return;
        }

        // Добавление в таблицу favorites
        const newFavorite = await knex('favorites').insert({
            user_id,
            product_id,
        }).returning('*');

        ctx.body = { message: 'Product added to favorites', favorite: newFavorite[0] };
        ctx.status = 201;
    } catch (error) {
        console.error(error);
        ctx.body = { error: 'Error adding to favorites' };
        ctx.status = 500;
    }
});


// Получение всех товаров в избранном для пользователя
router.get('/favorites/:user_id', async (ctx) => {
    const { user_id } = ctx.params;

    try {
        // Получение всех товаров в избранном для пользователя
        const favorites = await knex('favorites')
            .join('products', 'favorites.product_id', '=', 'products.id')
            .where('favorites.user_id', user_id)
            .select('products.id', 'products.name', 'products.description', 'products.img', 'products.category');

        if (favorites.length === 0) {
            ctx.body = { message: 'No favorites found for this user' };
            ctx.status = 404;
        } else {
            ctx.body = { favorites };
            ctx.status = 200;
        }
    } catch (error) {
        console.error(error);
        ctx.body = { error: 'Error fetching favorites' };
        ctx.status = 500;
    }
});

// Удаление товара из избранного
router.delete('/favorites', async (ctx) => {
    const { user_id, product_id } = ctx.request.body;

    if (!user_id || !product_id) {
        ctx.body = { error: 'User ID and Product ID are required' };
        ctx.status = 400;
        return;
    }

    try {
        const deletedFavorite = await knex('favorites')
            .where({ user_id, product_id })
            .del();

        if (deletedFavorite === 0) {
            ctx.body = { message: 'Product is not in favorites' };
            ctx.status = 404;
        } else {
            ctx.body = { message: 'Product removed from favorites' };
            ctx.status = 200;
        }
    } catch (error) {
        console.error(error);
        ctx.body = { error: 'Error removing from favorites' };
        ctx.status = 500;
    }
});


// //!
// async function main() {
//     console.log('start', new Date());

//     const knex = await getKnex();

//     const res = await knex.raw('select 1+1 as sum');

//     const app = new Koa();
//     app.use(bodyparser());
//     app.listen(8080);
//     app.use(router.routes());

//     app.use(userRouter.routes());

//     app.use(router.allowedMethods()); //! added

//     //!
//     // app.use(async(ctx) => {
//     //     ctx.body = {
//     //         hello: 'world',
//     //     };

//     //     ctx.status=200;
//     // });

//     //!

//     // knex('table')
//     //     .select('id', 'user')
//     //     .where({ id:1 });

//     console.log(res.rows);

//     //! const HTTP_PORT = 8080; //сервер уже используется
//     //! app.listen(HTTP_PORT, () => {
//     //!     console.log(`server started at port ${HTTP_PORT}`);
//     //! });

//     // const PG_URI='postgres://postgres:admin@localhost:5432/my_database';

//     // const client = new pg.Client(PG_URI);

//     // await client.connect();

//     // const res = await client
//     //     .query('select 1+1 as sum')
//     //     .catch((e) => {
//     //         console.log(e.message);

//     //         process.exit(1);
//     //     })

//     // const server = new http.Server(async(req, res) => {
//     //     //console.log('new req');
//     //     const { rows } = await client.query(`
//     //         select * from users limit 10
//     //         `)
//     //     res.end(`hello world: ${JSON.stringify(rows)}`);
//     // });

//     // server.listen(8080);
//     // console.log('server started at port 8080');
// }

// main().catch((e) => {
//     console.log(e);

//     process.exit(1);
// }); //PS C:\Users\ПК\Desktop\back-practice> curl localhost:8080/users