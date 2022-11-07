const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {
  constructor() {}
  async create(data) {
    const order = await models.Order.create(data);
    return order;
  }

  async find() {
    return [];
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [{ association: 'customer', include: ['user'] }, 'items'],
    });
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

  async addItem(data) {
    const orderProduct = await models.OrderProduct.create(data);
    return orderProduct;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: { '$customer.user.id$': userId },
      include: [{ association: 'customer', include: ['user'] }],
    });
    return orders;
  }
}

module.exports = OrderService;
