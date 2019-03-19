const next = require('next');
const Koa = require('koa');
const koaRouter = require('./routes-api');
const nextConfig = require('./next.config');
const app = next(nextConfig);
const pageRouter = require('./routes-page');
const nextHandler = pageRouter.getRequestHandler(app);

const application = new Koa();

(async () => {
  await app.prepare();

  application
    .use(async (ctx, next) => next().catch(e => console.log(e)))
    .use(koaRouter.routes())
    .use(async (ctx) => {
      ctx.status = 200;
      ctx.respond = false;
      nextHandler(ctx.req, ctx.res);
    })
    .listen(9999, () => console.log('Listen at 9999'));
})();


