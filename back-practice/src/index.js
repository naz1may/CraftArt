import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import { HTTP_PORT } from './utils/config.js';

import { userRouter } from './routes/usersRoutes.js';
import router from './routes/productsRoutes.js';
import { authRouter } from './routes/authRoutes.js';
import { favRouter } from './routes/favRoutes.js';

import { authChecker } from './middleware/authChecker.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';

async function main() {
    console.log('start', new Date());

    const app = new Koa();
    app.use(bodyparser());

    app.use(logger);

    app.use(errorHandler);

    app.use(authRouter.routes());
    app.use(userRouter.routes());
    app.use(router.routes());
    app.use(favRouter.routes());

    app.use(authChecker);


    app.use(async (ctx) => {
        ctx.status = 404;
        ctx.body = { message: `Route ${ctx.url} not found` };
    });

    app.listen(HTTP_PORT);

    console.log('App is listening on port', HTTP_PORT);
}

main().catch((e) => {
    console.log(e);
    process.exit(1);
});
