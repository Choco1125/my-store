'use strict';

const { CUSTOMER_TABLE } = require('../models/customer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      field: 'user_id',
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {},
};
