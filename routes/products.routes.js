const { Router } = require('express');
const { faker } = require('@faker-js/faker');

const router = Router();

router.get('/', (req, res) => {
  const products = [];

  const { size } = req.query;

  const limit = size || 10;

  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.imageUrl(),
    });
  }

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

  if (id === '999') return res.status(404).json({ message: 'Not found' });

  res.status(200).json({
    id,
    name: 'Product 1',
    price: 1000,
  });
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
