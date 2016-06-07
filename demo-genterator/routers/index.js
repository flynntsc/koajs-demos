import Router from 'koa-router';
const router = Router();

router.get('/', async(ctx, next) => {
    ctx.state = {
        title: 'koa2 title'
    };

    await ctx.render('index', {});
})

export default router;
