const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const user = await models.User.create(data);
    return user;
  }

  async find() {
    const users = await models.User.findAll();
    return users;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) throw boom.notFound('User not found');
    return user;
  }

  async update(id, changes) {
    let user = await this.findOne(id);
    user = await user.update(changes);

    return user;
  }

  async delete(id) {
    const user = await this.findOne(id);
    user.destroy();
    return { id };
  }
}

module.exports = UserService;
