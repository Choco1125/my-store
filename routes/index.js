const productsRouter = require('./products.routes');

function routerApi(app) {
  app.use('/products', productsRouter);
}

module.exports = routerApi;
