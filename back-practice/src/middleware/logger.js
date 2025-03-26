export const logger = async (ctx, next) => {
    console.log(`${ctx.method} ${ctx.url}`);
    await next();
};
