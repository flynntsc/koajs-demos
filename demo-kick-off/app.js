'use strict';

// import
import Koa from 'koa';
import bodyparser from 'koa-bodyparser'
import session from 'koa-session2'

// const
const app = new Koa();

// config
const post = process.env.POST || 2001;
var form = `
<form action="/login" method="POST">
    <input name="username" type="text" value="username">
    <input name="password" type="password" placeholder="The password is 'password'">
    <button type="submit">Submit</button>
</form>`;

// app
app.use(session({
    key: "SESSIONID",
}))

// bodyparse
app.use(bodyparser())

// index
app.use(async(ctx, next) => {
    if(ctx.path !== '/index') return await next();
    if(ctx.session.login) {
        ctx.body = 'Hello world index 2001';
    } else {
        ctx.status = 400;
        ctx.body = 'Have not login'
    }
})

// login
app.use(async(ctx, next) => {
    if(ctx.path !== '/login') return await next();
    if(ctx.method === 'GET') return ctx.body = form;
    if(ctx.method !== 'POST') return;
    const data = ctx.request.body;
    if(data.username === 'username' && data.password.length) {
        ctx.session.login = true;
        ctx.redirect('/index')
    } else {
        ctx.redirect('/login');
    }
})

// logout
app.use(async(ctx, next) => {
    if(ctx.path !== '/logout') return await next();
    ctx.session.login = false;
    ctx.body = 'has logout'
})

// info
app.listen(post)

console.log('Server has on in port ' + post)
