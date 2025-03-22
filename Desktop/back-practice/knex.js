import Knex from 'knex';
//import dotenv from 'dotenv';
import { PG_URI } from './config.js';

//dotenv.config();

let knex;

export async function getKnex() {
    if(knex){
        return knex;
    }

    //const PG_URI =  process.env.PG_URI;;

    knex=Knex(PG_URI);

    return knex;
}