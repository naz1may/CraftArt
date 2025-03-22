import Router from 'koa-router';
import { getUserById } from '../services/users.js'; // Импортируем сервис

export const userRouter = new Router();
import { getKnex } from '../knex.js';

// Получение пользователя по ID
userRouter.get('/users/:id', async (ctx) => {
    // const { id } = ctx.params; // Получаем ID из параметров запроса
    // try {
    //     const user = await getUserById(id); // Используем сервисную функцию для получения пользователя
    //     if (!user) {
    //         ctx.body = { error: 'User not found' };
    //         ctx.status = 404;
    //     } else {
    //         ctx.body = { user };
    //         ctx.status = 200;
    //     }
    // } catch (error) {
    //     console.log(error);
    //     ctx.body = { error: 'Error fetching user' };
    //     ctx.status = 500;
    // }

    const knex = await getKnex();
    const users = await knex('users')
        .where({ id: ctx.params.id })
        .first();

    ctx.body = {
        users,
    };

    ctx.status = 200;
});




// import Router from 'koa-router';
// import { getKnex } from '../knex.js';
// import { getUserById } from '../services/users.js';
// export const userRouter = new Router();

// const knex = await getKnex(); //! added

// userRouter.get('/users/:id', async (ctx) => {
//     const user = await getUserById(ctx.params.id)
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

// //получение пользователя по id
// // userRouter.get('/users/:id', async (ctx) => {
// //     const { id } = ctx.params;
// //     try {
// //         const user = await knex('users').where({id}).first();
// //         if(!user) {
// //             ctx.body = { error: 'User not found' };
// //             ctx.status = 404;
// //         } else {
// //             ctx.body = { user };
// //             ctx.status = 200;
// //         }
// //     } catch (error) {
// //         console.log(error);
// //         ctx.body = { error: 'Error fetching user' };
// //         ctx.status = 500;
// //     }
// // });

// // export default {
// //     userRouter,
// // };