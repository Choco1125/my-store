const { Router } = require('express');
const productsRouter = require('./products.routes');
const categoriesRouter = require('./categories.routes');
const usersRouter = require('./users.routes');
const orderRouter = require('./orders.routes');
const customersRoter = require('./customer.routes');
const authRouter = require('./auth.routes');
const profileRouter = require('./profile.routes');

function routerApi(app) {
  const router = Router();

  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/orders', orderRouter);
  router.use('/customers', customersRoter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
}

module.exports = routerApi;
