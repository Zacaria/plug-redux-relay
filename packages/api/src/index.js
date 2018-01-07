/**
 * Created by zac on 07/01/2018.
 */

const Koa = require('koa');
const app = new Koa();

// response
app.use(ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(3001);
