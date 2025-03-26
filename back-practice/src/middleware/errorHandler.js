export const errorHandler = async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        if (e.isJoi) {
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
};
