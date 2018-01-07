/**
 * Created by zac on 07/01/2018.
 */
import MyGraphQLSchema from './data/schema';

const Koa = require('koa');
const Router = require('koa-router'); // koa-router@7.x
const graphqlHTTP = require('koa-graphql');

const app = new Koa();
const router = new Router();

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.all(
  '/graphql',
  graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
  })
);

app.use(router.routes()).use(router.allowedMethods());

app.listen(3001);
