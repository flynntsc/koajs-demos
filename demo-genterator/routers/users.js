import Router from 'koa-router';
const router = Router();

router.get('/', async(ctx, next) => {
    ctx.state = {
        title: 'users title'
    };

    await ctx.render('users', {});
})

export
default router;