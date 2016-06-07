import Router from 'koa-router';
const router = Router();

router.get('/', async(ctx, next) => {
    ctx.state = {
        title: '404 Page Not Found'
    };

    await ctx.render('404', {});
})

export default router;
