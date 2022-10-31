const { Router } = require('express');
const ProductsService = require('./../services/products.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryPorductSchema,
} = require('./../schemas/product.schema');

const router = Router();
const service = new ProductsService();

router.get(
  '/',
  validatorHandler(queryPorductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const product = await service.create(body);

      res.status(201).json({
        message: 'created',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  (req, res, next) => {
    try {
      const { id } = req.params;

      const product = service.findById(id);

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const product = service.update(id, body);
      res.status(200).json({
        message: 'updated',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const product = service.delete(id);

    res.status(200).json({
      message: 'deleted',
      product,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
