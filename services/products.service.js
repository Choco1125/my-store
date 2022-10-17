const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const product = await models.Product.create(data);
    return product;
  }

  async find() {
    const products = await models.Product.findAll({
      include: ['category'],
    });
    return products;
  }

  findById(id) {
    const product = this.products.find((product) => product.id === id);

    if (!product) throw boom.notFound('Product not found');

    if (product.isBlock) throw boom.conflict('Is blocked');

    return product;
  }

  update(id, changes) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) throw boom.notFound('Product not found');

    const product = this.products[index];

    this.products[index] = {
      ...product,
      ...changes,
    };

    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) throw boom.notFound('Product not found');

    this.products.splice(index, 1);

    return { id };
  }
}

module.exports = ProductsService;
