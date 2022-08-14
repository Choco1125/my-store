const { Router } = require('express');
const productsRouter = require('./products.routes');

function routerApi(app) {
  const router = Router();

  app.use('/api/v1', router);
  router.use('/products', productsRouter);
}

module.exports = routerApi;
