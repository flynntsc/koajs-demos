import Koa from 'koa'
import mongoose from 'mongoose'
import faker from 'faker'

import User from './models/user.js'

const app = new Koa();
const post = process.env.POST || 2001;

// 监听
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log(`DB has open!`)
})

// 连接数据库
mongoose.connect('mongodb://localhost/test')

// const ObjectId = mongoose.Schema.ObjectId;

// 展示
app.use(async(ctx, next) => {
    if(ctx.path !== '/index') return await next();

    const data = await User.find();
    ctx.body = data;
})

// 添加
app.use(async(ctx, next) => {
    if(ctx.path !== '/add') return await next();

    // 新建数据以便保存
    const flyn = new User({
        name: faker.name.findName(),
        age: faker.random.number({ max: 90, min: 10 }),
        birth: Date.now(),
        sex: faker.random.boolean(),
    })

    // 保存到数据库
    const data = await flyn.save();
    ctx.redirect('/index')

})

// 删除
app.use(async(ctx, next) => {
    if(ctx.path !== '/del') return await next();

    const data = await User.findOneAndRemove();
    ctx.redirect('/index');
})

// info
app.listen(post)

console.log('Server has on in port ' + post)
