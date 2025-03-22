import { getKnex } from '../knex.js';

const knex = await getKnex(); // Инициализация knex

// Получение пользователя по ID
export async function getUserById(id) {
    try {
        const user = await knex('users').where({ id }).first(); // Запрос к базе
        if (!user) {
            return null; // Возвращаем null, если пользователь не найден
        }
        return user; // Возвращаем пользователя, если он найден
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching user'); // В случае ошибки выбрасываем исключение
    }
}



// import { getKnex } from '../knex.js';

// const knex = await getKnex();

// export async function getUsers() {

// }

// export async function getUserById(id) {
//     //const { id } = ctx.params;
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

//     return user;
// }