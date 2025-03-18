import Knex from 'knex';

let knex;

export async function getKnex() {
    if(knex){
        return knex;
    }

    const PG_URI='postgres://postgres:admin@localhost:5432/my_database';

    knex=Knex(PG_URI);

    return knex;
}