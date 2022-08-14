const express = require('express');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//New route
app.get('/nueva-ruta', (req, res) => {
  res.send("Hi, I'm a new route");
});

//Route returning json
app.get('/products', (req, res) => {
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

//Route with paramas

//Specific routes are firts and dinamic after
app.get('/products/filter', (req, res) => {
  res.send("I'm a filter");
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Product 1',
    price: 1000,
  });
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
    name: 'Product 1',
    price: 1000,
  });
});

//Route with query params
app.get('/users', (req, res) => {
  const { limit, offset } = req.query;

  if (!limit && !offset) return res.send('Paremeters not provided');

  res.json({ limit, offset });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
