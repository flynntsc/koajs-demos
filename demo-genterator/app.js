'use strict';

// Import
import Koa from 'koa';
import Router from 'koa-router';
import views from 'koa-views';
import convert from 'koa-convert';
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import onerror from 'koa-onerror';
import logger from 'koa-logger';
import koaStatic from 'koa-static';

import index from './routers/index';
import users from './routers/users';
import page404 from './routers/404';

// Const
const app = new Koa()
const router = Router();

// Config
const port = process.env.PORT || 2000;


// Middlewares
app.use(convert(bodyparser()));
app.use(convert(json()));
app.use(convert(logger()));
app.use(convert(koaStatic(__dirname + '/public')));

app.use(views(__dirname + '/views', {
    extension: 'jade'
}));


// Logger
app.use(async(ctx, next) => {
    const start = new Date();
    if(ctx.status === 404) {
        ctx.body = 'Page Not Found'
    }
    await next();
    const ms = new Date() - start;
    // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.use(async(ctx, next) => {
    console.log(ctx.status)
    await next()
})

router.use('/index', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/404', page404.routes(), page404.allowedMethods());


app.use(router.routes(), router.allowedMethods()).listen(port);

// Response
app.on('error', (err, ctx) => {
    console.log(err)
    log.error('server error', err, ctx);
});

// Export
export default app;
