const { User, userSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');

function setupModels(sequelize) {
  User.init(userSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
}

module.exports = setupModels;
