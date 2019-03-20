const Router = require('koa-router');

const koaRouter = new Router();

koaRouter.get('/api/customer/:id', async (ctx) => {
  ctx.body = { name: 'Hello ' + ctx.params.id };
});

module.exports = koaRouter;