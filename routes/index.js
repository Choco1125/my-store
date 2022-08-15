const { Router } = require('express');
const productsRouter = require('./products.routes');
const categoriesRouter = require('./categories.routes');
const usersRouter = require('./users.routes');
const orderRouter = require('./orders.routes');

function routerApi(app) {
  const router = Router();

  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/orders', orderRouter);
}

module.exports = routerApi;
