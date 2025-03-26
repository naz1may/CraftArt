import { getKnex } from '../utils/knex.js';

const knex = await getKnex();


class UserService {
    static async getUserById(id) {
        const knex = await getKnex();
        const user = await knex('users')
            .where({ id })
            .first();
        return user;
    }

    static async getAllUsers() {
        const knex = await getKnex();
        const users = await knex('users');
        return users;
    }
}

export default UserService;
