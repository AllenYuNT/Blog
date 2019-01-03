/**
 * @file index.js
 *
 * @author yupeng(yupeng12@baidu.com)
 * @created: 2018/12/27
 */



'use strict';
const Koa = require('koa');
const app = new Koa();
const router = require('./routers/router');
const koaBody = require('koa-body');
const jwt = require('koa-jwt');
const config = require('./app_config');
const cors = require('koa-cors');


// router.post('/transImg', koaBody(), Auth.auth, transImage.transImageToBOS);
// logger

app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    console.log(`${ctx.method} ${ctx.status} ${ctx.url} - ${ms} ms`)
});

//错误处理
app.use(require('./middlewares/ErrorCatch')())

//跨域
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*" // 允许来自所有域名请求
        }
        return 'http://localhost:8080' // 只允许 http://localhost:8080 这个域名的请求
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],

}))

const errorHandle = require('./middlewares/errorHandle');
app.use(errorHandle);

//认证
const secret = config.secret;
app.use(jwt({
    secret,
}).unless({
    path: [/\/login/, /\/getBlog/]
}))


app.use(koaBody());
app.use(router.routes(), router.allowedMethods()); // 添加路由中间件

app.listen(8088, () => {
    console.log("------------------------------------------------------------------------------------------->");
    console.log('server is listening at port 8088 on ' + new Date() + '\n');
});