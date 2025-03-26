export const authChecker = async (ctx, next) => {
    if (ctx.url.startsWith('/favorites')) {
        const { headers } = ctx.request;
        const { authorization } = headers;
        const token = authorization?.split(' ')[1];

        if (token) {
            const knex = await getKnex();
            const { rows: [userInfo] } = await knex.raw(`
                SELECT users.id, users.name, users.email, users.password
                FROM tokens
                INNER JOIN users
                ON users.id = tokens.user_id
                WHERE tokens.token = ?
            `, [token]);

            if (!userInfo) {
                ctx.status = 401;
                ctx.body = { message: 'NOT AUTHORIZED' };
                return;
            }

            ctx.state.user = userInfo;
            await next();
        } else {
            ctx.status = 401;
            ctx.body = { message: 'NOT AUTHORIZED' };
        }
    } else {
        await next();
    }
};
