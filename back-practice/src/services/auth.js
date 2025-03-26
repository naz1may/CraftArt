import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { getKnex } from '../utils/knex.js';

class AuthService {
    static async registerUser(name, email, password) {
        const passwordHash = await bcrypt.hash(password, 12);
        const knex = await getKnex();
        
        const dbUser = await knex('users').insert({
            name,
            email,
            password: passwordHash,
        }).returning('*');
        
        return dbUser[0];
    }

    static async loginUser(email, password) {
        const knex = await getKnex();
        const dbUser = await knex('users').where({ email }).first();
        
        if (!dbUser) {
            throw new Error('USER_NOT_FOUND');
        }

        const match = await bcrypt.compare(password, dbUser.password);
        
        if (!match) {
            throw new Error('login or password is incorrect');
        }
        
        const token = crypto.randomBytes(20).toString('hex');
        
        await knex('tokens').insert({
            user_id: dbUser.id,
            token,
        });

        return token;
    }

    static async logoutUser(token) {
        const knex = await getKnex();
        const result = await knex('tokens').where({ token }).del();
        
        if (result === 0) {
            throw new Error('Invalid or expired token');
        }
    }
}

export default AuthService;
