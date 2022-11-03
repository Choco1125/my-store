const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const bcrypt = require('bcrypt');

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const user = await models.User.create({ ...data, password: hash });
    delete user.dataValues.password;
    return user;
  }

  async find() {
    const users = await models.User.findAll({
      include: ['customer'],
    });
    return users;
  }

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: { email },
    });
    return user;
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
