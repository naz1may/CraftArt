import Koa from 'koa';
import Router from 'koa-router';
import bodyparser from 'koa-bodyparser';
import { getKnex } from './knex.js'; //knex это оберка над pg, sql/ помощник собрать какой-то запрос

import { userRouter } from './controllers/users.js';
import { 
    router,
    authRouter,
} from './controllers/index.js';

import { HTTP_PORT } from './config.js';

async function main() {
    console.log('start', new Date());

    const knex = await getKnex();

    const res = await knex.raw('select 1+1 as sum');

    const app = new Koa();
    app.use(bodyparser());
    //app.listen(8080);
    //app.use(router.routes());

    //app.use(userRouter.routes());

    //app.use(router.allowedMethods()); 

    app.use((async (ctx, next) => {
        try {
            await next();
            console.log('after request in try catch');
        } catch (e) {
            if(e.isJoi){
                console.log('this is joi error');
                ctx.status = 400;
                ctx.body = {
                    errors: e.details,
                };

                return;
            }
                console.log('caught in try-catch', e.message);

            ctx.status = 500;
            ctx.body = {
                message: e.message,
            };
        }
    }));
    
    app.use(async (ctx, next) => {
        console.log(ctx.method, ctx.url, ctx.body);

        //return next;
        await next();
        console.log('after request in logger');
    });
    app.use(authRouter.routes());

    app.use(async (ctx, next) => {
        const { headers } = ctx.request;

        console.log(headers);
        const { authorization } = headers;

        const token = authorization?.split(' ')[1];

        console.log({ token, authorization });

        if( token ) { //!находит только айди юзера по токену, остальная информация не выводится
            const { rows: [userInfo] } = await knex.raw(`
                select users.id, users.name, users.email, users.password
                from tokens
                inner join users
                    on users.id = tokens.user_id
                where tokens.token = ?
                `, [token]);

                console.log(userInfo);

                if(!userInfo){
                    throw new Error('NOT AUTHORIZED');
                }

                ctx.state.user = userInfo;

                return next();
        }

        throw new Error('NOT AUTHORIZED');
    });
    app.use(router.routes());
    app.use(userRouter.routes());

    app.use(router.allowedMethods()); 

    app.use(async (ctx, next) => {
        ctx.body = {
            hello: 'world',
        };

        ctx.status = 200;
    });

    app.listen(HTTP_PORT);

    console.log(res.rows);

}

main().catch((e) => {
    console.log(e);

    process.exit(1);
});