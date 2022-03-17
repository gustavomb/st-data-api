const Koa = require('koa');
const jwt = require('koa-jwt');
const routes = require('./routes');

const app = new Koa();

app.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: [/^\/login/] }));
app.use(routes.routes());
app.use(routes.allowedMethods());

module.exports = app;
