const { Router } = require('express');
const ProductsService = require('./../services/products.service');

const router = Router();
const service = new ProductsService();

router.get('/', (req, res) => {
  const products = service.find();

  res.status(200).json(products);
});

router.post('/', (req, res) => {
  const body = req.body;
  const product = service.create(body);

  res.status(201).json({
    message: 'created',
    data: product,
  });
});

router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;

    const product = service.findById(id);

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', (req, res, next) => {
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
});

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
