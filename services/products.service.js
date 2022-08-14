const { faker } = require('@faker-js/faker');

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
      });
    }
  }

  create(data) {
    const product = {
      id: faker.datatype.uuid(),
      ...data,
    };

    this.products.push(product);

    return product;
  }

  find() {
    return this.products;
  }

  findById(id) {
    return this.products.find((product) => product.id === id);
  }

  update(id, changes) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) throw new Error(`Product ${id} not found`);

    const product = this.products[index];

    this.products[index] = {
      ...product,
      ...changes,
    };

    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) throw new Error(`Product ${id} not found`);

    this.products.splice(index, 1);

    return { id };
  }
}

module.exports = ProductsService;
