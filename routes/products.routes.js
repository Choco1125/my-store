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

  res.status(201).json({
    message: 'created',
    data: body,
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const product = service.findById(id);

  res.status(200).json(product);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  res.status(200).json({
    message: 'updated',
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    message: 'deleted',
    id,
  });
});

module.exports = router;
