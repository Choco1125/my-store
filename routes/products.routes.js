const { Router } = require('express');
const { faker } = require('@faker-js/faker');

const router = Router();

//Route returning json
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

  res.json(products);
});

router.post('/', (req, res) => {
  const body = req.body;

  res.json({
    message: 'created',
    data: body,
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Product 1',
    price: 1000,
  });
});

//Route with paramas

//Specific routes are firts and dinamic after
router.get('/filter', (req, res) => {
  res.send("I'm a filter");
});

router.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
    name: 'Product 1',
    price: 1000,
  });
});

module.exports = router;
